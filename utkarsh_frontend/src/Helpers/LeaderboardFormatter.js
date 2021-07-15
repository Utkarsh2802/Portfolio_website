const LeaderboardFormatter = () => {
  const leaderboardData = JSON.parse(localStorage.getItem("data"));
  const formattedData = leaderboardData.leaderboardData.map(
    (element, index) => {
      return { rank: index + 1, ...element };
    }
  );
  return formattedData;
};
export default LeaderboardFormatter;
