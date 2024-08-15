import withLess from 'next-with-less';

export default withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        '@primary-color': '#1DA57A', 
      },
      javascriptEnabled: true,
    },
  },
  webpack(config) {
    return config;
  },
});
