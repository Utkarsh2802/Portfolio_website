const LeaderboardFormatter = () => {
  try {
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
  } catch {
    return [
      //just to show some rows if the data cannot be fetched
      [
        {
          rank: 1,
          username: "Aleda Niccols",
          tests_taken: 161,
          avg_speed: 119.97,
          accuracy: 55.1,
          improvement_speed: 5.79,
        },
        {
          rank: 2,
          username: "Utkarsh_Agarwal",
          tests_taken: 11,
          avg_speed: 109.97,
          accuracy: 98.1,
          improvement_speed: 7.79,
        },
      ],
      { datapresent: false },
    ];
  }
};
export default LeaderboardFormatter;
