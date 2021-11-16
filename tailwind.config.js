module.exports = {
    important: true,
    purge: {
      content: ["components/**/*.vue", "layouts/**/*.vue", "pages/**/*.vue"],
      layers: ["components"],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      screens: {
        md: '600px',
        lg: '782px',
        xl: '1152px',
        '2xl': '1440px'
      },
      // maxWidth: {
      //   "case-single": "1199px",
      //   "6xl": "4rem"
      // },
      maxHeight: {
        photo: "50rem",
      },
      colors: {
        blue: "#0f66ff",
        white: "#fff",
        pink: "#ef4300",
        yellow: "#B8C734",
        "div-grey": "#979797",
        "burnt": "#ef4300",
      },
      fontSize: {
        xs: ".75rem",
        tiny: ".875rem",
        sm: ".8889rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem",
        head: "50px",
        "sub-head": "30px",
        "blog-head": "64px",
        body: "18px",
      },
      // fontFamily: {
      //   // head: ["freight-big-pro"],
      //   // body: ["europa"],
      //   // footer: ["futura-pt"]
      //   head: ["Nunito"],
      //   body: ["Nunito"],
      //   footer: ["Nunito"]
      // },
      textColor: {
        pink: "#ef4300",
        white: "#FFFFFF",
        grey: "#2B3034",
        "h5-grey": "#979797",
        green: "#13C9B1",
        "body-grey": "#333333"
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        grey: "#2B3034",
        "quote-grey": "#f2f2f2",
        pink: "#ef4300",
        "back-grey": "#F4F4F5",
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        "burnt": "#ef4300",
      }),
      extend: {
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  