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
          username: "Utkarsh Agarwal",
          tests_taken: 11,
          avg_speed: 109.97,
          accuracy: 98.1,
          improvement_speed: 7.79,
        },
        {
          rank: 3,
          username: "Alison",
          tests_taken: 125,
          avg_speed: 95,
          accuracy: 97.1,
          improvement_speed: 17.79,
        },
        {
          rank: 4,
          username: "Harvey",
          tests_taken: 101,
          avg_speed: 89.97,
          accuracy: 94.7,
          improvement_speed: 3.79,
        },
        {
          rank: 5,
          username: "Karan",
          tests_taken: 145,
          avg_speed: 69.97,
          accuracy: 99.1,
          improvement_speed: 10.79,
        },
      ],
      { datapresent: false },
    ];
  }
};
export default LeaderboardFormatter;
