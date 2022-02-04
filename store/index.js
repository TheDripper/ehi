import classes from "~/static/classes.json";
import wpapi from "wpapi";
import { decode } from "html-entities";
import $ from "cheerio";
export const state = () => ({
  comments: [],
  facets: [],
  search: [],
  header: null,
  footer: null,
  myPosts: [],
  myPage: null,
  posts: null,
  pages: null,
  users: [],
  loggedin: false,
  home: null,
  news: null,
  featNews: [],
  featRest: [],
  subscribe: null,
  whatWeveDone: null,
  whoWeAre: null,
  restLog: null,
  restReg: null,
  restCreate: null,
  restSubmit: null,
  restDash: null,
  classes: "",
  ajax: "",
});

export const mutations = {
  header(state, header) {
    state.header = header;
  },
  footer(state, footer) {
    state.footer = footer;
  },
  myPosts(state, myPosts) {
    state.myPosts = myPosts;
  },
  myPage(state, myPage) {
    state.myPage = myPage;
  },
  posts(state, posts) {
    state.posts = posts;
  },
  facets(state, facets) {
    state.facets = facets;
  },
  comments(state, comments) {
    state.comments = comments;
  },
  pages(state, pages) {
    state.pages = pages;
  },
  search(state, search) {
    state.search = search;
  },
  users(state, users) {
    state.users = users;
  },
  loggedin(state, loggedin) {
    state.loggedin = loggedin;
  },
  subscribe(state, subscribe) {
    state.subscribe = subscribe;
  },
  classes(state, classes) {
    state.classes = classes;
  },
  home(state, home) {
    state.home = home;
  },
  news(state, news) {
    state.news = news;
  },
  featNews(state, featNews) {
    state.featNews = featNews;
  },
  featRest(state, featRest) {
    state.featRest = featRest;
  },
  restLog(state, restLog) {
    state.restLog = restLog;
  },
  restReg(state, restReg) {
    state.restReg = restReg;
  },
  restCreate(state, restCreate) {
    state.restCreate = restCreate;
  },
  restSubmit(state, restSubmit) {
    state.restSubmit = restSubmit;
  },
  restDash(state, restDash) {
    state.restDash = restDash;
  },
  whatWeveDone(state, whatWeveDone) {
    state.whatWeveDone = whatWeveDone;
  },
  whoWeAre(state, whoWeAre) {
    state.whoWeAre = whoWeAre;
  },
  ajax(state, ajax) {
    state.ajax = ajax;
  },
};
export const actions = {
  //  async getPage(context, id) {
  //   //  const page = await this.$axios.$get('/server-middleware/page/'+id);
  //   //  const page = await this.$axios.$get("/wp-json/wp/v2/pages/"+id);
  //    return page
  //  },
  setPage({ commit, state }, page) {
    commit("myPage", page);
  },
  setUser({ commit, state }, loggedin) {
    commit("loggedin", loggedin);
    // set myPosts
    // let wp = new wpapi({
    //   endpoint: "https://eathereindy.nfshost.com/wp-json",
    //   username: "tylerhillwebdev",
    //   password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
    //   auth: true,
    // });
    let mySlug = state.pages.authors[loggedin];
    let myPage = state.pages[mySlug];
    commit("myPage", myPage);
  },
  async nuxtServerInit({ commit }) {
    function IsJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }
    let wp = new wpapi({
      endpoint: "https://eathereindy.nfshost.com/wp-json/",
      username: "tylerhillwebdev",
      password: "0MH4 CK5W 2Fm8 GUjP T4GG lHvw",
      auth: true,
    });
    let facets = await wp.tags().perPage(100).get();
    commit("facets", facets);
    const pages = await wp.posts().categories(183).perPage(100).get();
    const news = await wp.posts().categories(207).perPage(100).get();
    const comments = await wp.comments().perPage(100).get();
    commit("comments", comments);
    let newsSearch = [];
    let slugs = {};
    let urls = [];
    let search = [];
    let authors = {};
    let featRest = [];
    for (let page of pages) {
      var jstr = $("<div/>").html(page.content.rendered).text();
      let slugfix = page.slug.replace("-", "");
      if (IsJsonString(page.content.rendered)) {
        var obj = JSON.parse(jstr);
        slugs[slugfix] = obj;
        if (page.author !== 1) {
          authors[page.author] = slugfix;
        }
      } else {
        slugs[slugfix] = jstr;
      }
      if (page.author !== 1 && page.categories.includes(209)) {
        let slugLink = "/spots/" + page.slug;
        urls.push({ link: slugLink, title: page.title.rendered });
        let cat = page.tags;
        let { blurb } = JSON.parse(page.content.rendered);
        let feat = 0;
        if (page.media !== 0) {
          feat = await wp.media().id(page.featured_media).get();
        }
        search.push({
          link: slugLink,
          title: page.title.rendered,
          media: feat.guid.rendered,
          blurb: blurb,
        });
        if (page.categories.includes(227)) {
          featRest.push({
            link: slugLink,
            title: page.title.rendered,
            media: feat.guid.rendered,
            blurb: blurb,
          });
        }
      } else {
        let slugLink = "/" + page.slug;
        urls.push({ link: slugLink, title: page.title.rendered });
      }
    }

    slugs["urls"] = urls;
    slugs["authors"] = authors;
    commit("featRest", featRest);
    commit("pages", slugs);
    commit("search", search);

    // const home = await wp.pages().id(5).get();
    let home = "";
    commit("home", home);
    let subscribe = "";
    commit("subscribe", subscribe);
    // const header = await wp.pages().id(1015).get();
    let header = slugs.header;
    commit("header", header);
    // const footer = await wp.pages().id(1017).get();
    let footer = slugs.footer;
    commit("footer", footer);
    const users = await wp.users().perPage(100).get();
    const profiles = await wp.posts().categories(183).get();
    let ids = {};
    for (let user of users) {
      let profile = null;
      for (let prof of profiles) {
        if (prof.author == user.id) {
          profile = JSON.parse(prof.content.rendered);
        }
      }
      ids[user.id] = {
        name: user.name,
        profile,
      };
    }
    commit("users", ids);
    let restReg = "";
    commit("restReg", restReg);
    const restCreate = slugs.restaurantcreated;
    commit("restCreate", restCreate);
    let restSubmit = "";
    commit("restSubmit", restSubmit);
    let restDash = "";
    commit("restDash", restDash);
    const posts = await wp.posts().perPage(100).get();
    for (let post of posts) {
      let slugLink = "/posts/" + post.slug;
      urls.push({ link: slugLink, title: post.title.rendered });
    }
    let featNews = [];
    for (let post of news) {
      var jstr = $("<div/>").html(post.content.rendered).text();
      let slugfix = post.slug.replace("-", "");
      if (IsJsonString(post.content.rendered)) {
        var obj = JSON.parse(jstr);
        let slugLink = "/posts/" + post.slug;
        obj.link = slugLink;
        let date = new Date(post.date.substring(0,10));
        obj.date = date.toLocaleDateString("en-US",{
          weekday: 'long',
          day: 'numeric',
          year: 'numeric',
          month: 'long'
        });
        // let author = await wp.users().id(post.author).get();
        console.log("ids", ids);
        console.log("author", post.author);
        let profile = null;
        if (ids[post.author] && ids[post.author].profile) {
          profile = ids[post.author].profile;
        }
        // console.log('author',author);
        // let profile = await wp.posts().categories(183).get();
        obj.author = profile;
        newsSearch.push(obj);
        if (post.categories.includes(227)) {
          featNews.push(obj);
        }
        slugs[slugfix] = obj;
        if (post.author !== 1) {
          authors[post.author] = slugfix;
        }
      } else {
        slugs[slugfix] = jstr;
      }
      let slugLink = "/posts/" + post.slug;
      urls.push({ link: slugLink, title: post.title.rendered });
    }
    commit("featNews", featNews);
    commit("news", newsSearch);
    let postSlugs = {};
    let postAuthors = {};
    for (let post of posts) {
      var jstr = $("<div/>").html(post.content.rendered).text();
      let postslugfix = post.slug.replace("-", "");
      let content = "";
      let native = false;
      if (IsJsonString(post.content.rendered)) {
        var obj = JSON.parse(jstr);
        obj.id = post.id;
        postSlugs[postslugfix] = obj;
        content = post.content.rendered;
      } else {
        postSlugs[postslugfix] = jstr;
        content = post.content;
        native = true;
      }
      let ary = postAuthors[post.author];
      if (typeof ary !== "object") {
        ary = [];
      }
      // let content = JSON.parse(post.content.rendered);
      let link = "/posts/" + post.slug;
      let newSend = {
        slug: postslugfix,
        title: post.title.rendered,
        content: content,
        link: link,
        id: post.id,
        native: native,
      };
      newSend = JSON.stringify(newSend);
      ary.push(newSend);
      postAuthors[post.author] = ary;
    }
    postSlugs["authors"] = postAuthors;
    commit("posts", postSlugs);
    // if (process.env.NODE_ENV == "development") {
    //   const posts = await this.$axios.$get("/wp-json/wp/v2/pages");
    //   commit("posts", posts);
    // } else {
    //   commit("posts", pages);
    // }
    commit("classes", classes);
  },
};
