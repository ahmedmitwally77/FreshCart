import Lottie from 'lottie-react'; // الاستيراد الصحيح

const AnimatedSVG = ({ animationData }) => {
  return (
    <div className="w-full">
      <Lottie
        animationData={animationData}
        loop={true} 
      />
    </div>
  );
};

export default AnimatedSVG;
