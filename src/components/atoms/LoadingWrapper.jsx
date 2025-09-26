import BeatLoader from "react-spinners/BeatLoader";

export const LoadingWrapper = ({loading, children}) => {
  if(loading) {
        return (
            <div className = "w-full flex justify-center ">
                <BeatLoader size = {15} color = "#FF4000"/>
            </div>
    )
  }
   return children;
}
