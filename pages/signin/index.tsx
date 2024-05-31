export const getStaticProps = async () => {
  return {
    props: {
      layoutType: "removeLayout",
    },
  };
};

const SignIn = () => {
  return <div>SignIn 페이지</div>;
};

export default SignIn;
