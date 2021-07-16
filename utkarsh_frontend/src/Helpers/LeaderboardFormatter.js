const LeaderboardFormatter = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  var userdata = { datapresent: false };
  var username = null;

  if (data.loggedIn == true) {
    username = data.username;
  }
  const formattedData = data.leaderboardData.map((element, index) => {
    if (username != null && element.username === username) {
      userdata = { rank: index + 1, datapresent: true, ...element };
    }
    return { rank: index + 1, ...element };
  });
  return [formattedData, userdata];
};
export default LeaderboardFormatter;
