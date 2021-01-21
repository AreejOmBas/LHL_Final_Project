const getPostsByUsers = (usersPosts) => {
  const postsByUsers = {};

  for (let post of usersPosts) {
      if (!postsByUsers[post.user_id]) {
          postsByUsers[post.user_id] = {
              userId: post.user_id,
              firstName: post.first_name,
              lastName: post.last_name,
              email: post.email,
              posts: [],
          };
      }

      postsByUsers[post.user_id].posts.push({
          title: post.title,
          content: post.content,
      });

  }

  return Object.values(postsByUsers);
};

const setIntervalDateUponSignUp = () => {
  let nextSurveyDate;
  let now = new Date();
  //console.log('now is ', now)
  let nextMonth = now.setMonth(now.getMonth() + 1, 1);
  let monthAfterNext = now.setMonth(now.getMonth() + 2, 1);

  nextMonth = new Date(nextMonth);

  //console.log(nextMonth)
  now = new Date();
  const diffTime = Math.abs(nextMonth - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 20) {
    nextSurveyDate = nextMonth;
  } else {
    nextSurveyDate = monthAfterNext;
  }

  return nextSurveyDate;
}




module.exports = {
  getPostsByUsers,
};