import fse from "fs-extra";
import path from "path";
const axios = require("axios");
const cheerio = require("cheerio");
import wpapi from "wpapi";

export default async function asyncModule() {
  if (process.env.NODE_ENV == "development") {
    try {
      // console.log(process.env);
      //   let classes = ['hidden'];
      //   $('.wp-block-columns, .wp-block-column, h1, h2, h3, h4, h5, h6, p, a, li').each(function(){
      //       classes.push($(this).attr('class'));
      //   })
      //   fse.writeFile("./static/classes.json", JSON.stringify(classes));
      let old = new wpapi({
        endpoint: "https://eatheremedia.com/wp-json",
        // username: "tylerhillwebdev",
        // password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        // auth: true,
      });
      let posts = await old.posts().perPage(10).get();
      let wp = new wpapi({
        endpoint: "https://eathereindy.nfshost.com/wp-json/",
        username: "tylerhillwebdev",
        password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
        auth: true,
      });

      for (let post of posts) {
        const $ = cheerio.load(post.content.rendered);
        $("figure").each(function () {
          $(this).remove();
        });
        let body = $.html();

        console.log("cats", post.categories);
        let newcats = [];
        for (let cat of post.categories) {
          let oldcat = await old.categories().id(cat);
          let newcat = await wp.categories().slug(oldcat.slug).get();
          console.log("newcat", newcat[0]);
          newcats.push(newcat[0].id);
        }
        console.log("newcats", newcats);
        newcats.push(207);
        let newPost = await wp.posts().create({
          title: post.title.rendered,
          content: body,
          author: 76,
          categories: newcats,
          status: "publish",
        });
        if (post.featured_media) {
          let feat = await old.media().id(post.featured_media).get();
          let featSrc = await axios.get(feat.guid.rendered, {
            responseType: "arraybuffer",
          });
          console.log(featSrc);
          featSrc = featSrc.data;
          let name = feat.slug;
          let ext = path.extname(feat.guid.rendered);
          // var data = featSrc.replace(/^data:image\/\w+;base64,/, "");

          var buf = Buffer.from(featSrc, "base64");
          let filename = "./static/" + name + ext;
          await fse.writeFile(filename, buf, "base64");
          let newImg = await wp.media().file(filename).create();
          console.log("newImg", newImg);
          let content = {
            body,
            media: newImg.guid.rendered,
            title: newPost.title.rendered,
            link: newPost.link,
          };
          content = JSON.stringify(content);
          wp.posts().id(newPost.id).update({
            featured_media: newImg.id,
            content: content,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
