import fse from "fs-extra";
import path from "path";
const axios = require("axios");
const cheerio = require("cheerio");
import wpapi from "wpapi";

export default async function asyncModule() {
  try {
    //   const { data } = await axios(
    //     "https://eathereindy.nfshost.com/wp-json/wp/v2/pages/5"
    //   );
    //   const $ = cheerio.load(data);
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
    let posts = await old.posts().perPage(1).get();
    let wp = new wpapi({
      endpoint: "https://eathereindy.nfshost.com/wp-json/",
      username: "tylerhillwebdev",
      password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
      auth: true,
    });

    for (let post of posts) {
      let newPost = await wp.posts().create({
        title: post.title.rendered,
        content: post.content.rendered,
        author: 76,
        categories: post.categories,
        status: "publish",
      });
      if (post.featured_media) {
        let feat = await old.media().id(post.featured_media).get();
        let featSrc = await axios.get(feat.guid.rendered);
        featSrc = featSrc.data;
        let name = feat.slug;
        let ext = path.extname(feat.guid.rendered);
        var data = featSrc.replace(/^data:image\/\w+;base64,/, "");
        var buf = Buffer.from(data, 'base64');
        fse.writeFile("./static/"+name+ext, buf,'base64');
        // let newImg = await wp.media().file(feat.guid.rendered).create();
        // wp.posts().id(newPost.id).update({
        //   featured_media: feat,
        // });
      }
    }
  } catch (err) {
    console.log(err);
  }
}
