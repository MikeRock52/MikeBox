const theme = {
  name: "global-theme",
  tokens: {
    components: {
      collection: {
        pagination: {
          current: {
            color: { value: "#d9f99d" },
            backgroundColor: {
              value: "#4d7c0f",
            },
          },
          button: {
            color: { value: "{colors.blue.60}" },
            _hover: {
              backgroundColor: {
                value: "{colors.blue.10}",
              },
              color: { value: "{colors.blue.60}" },
            },
          },
        },
        search: {
          input: {
            color: { value: "{colors.blue.60}" },
          },
          button: {
            color: { value: "#4d7c0f" },
            // backgroundColor: { value: "#4d7c0f"},
            _focus: {
              backgroundColor: {
                value: "#4d7c0f",
              },
              color: {
                value: "#d9f99d",
              },
            },
            _hover: {
              backgroundColor: {
                value: "#4d7c0f",
              },
              color: {
                value: "#d9f99d",
              },
            },
          },
        },
      },
      menuItem: {
        button: {
          _hover: {
            backgroundColor: '#a3e635',
          },
        },
      },
      //   card: {
      //     backgroundColor: { value: '{colors.background.secondary}' },
      //     outlined: {
      //       borderColor: { value: '{colors.black}' },
      //     },
      //   },
      //   heading: {
      //     color: { value: '{colors.brand.secondary[80]}' },
      //   },
      //   text: {
      //     color: { value: '{colors.brand.primary[80]}' },
      //   },
    },
  },
};

export default theme;
