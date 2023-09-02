import LoadingLottie from "../../LoadingLottie";

export default function LoadingLayout({ isLoading, results, children }) {
  return (
    <>
      {isLoading || results?.some((result) => result.isLoading) ? (
        <LoadingLottie />
      ) : (
        <>{children}</>
      )}
    </>
  );
}
