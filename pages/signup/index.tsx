export const getStaticProps = async () => {
  return {
    props: {
      layoutType: "removeLayout",
    },
  };
};

const SignUp = () => {
  return <div>SignUp 페이지</div>;
};

export default SignUp;
