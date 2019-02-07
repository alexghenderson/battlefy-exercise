import App, { Container } from 'next/app';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let props = {};

    if (Component.getInitialProps) {
      props = await Component.getInitialProps(ctx);
    }

    return { props };
  }

  render() {
    const { Component, props } = this.props;

    return (
      <Container>
        <Component {...props} />
      </Container>
    );
  }
}
