# Auth Router 
post/signup
post/login
post/logout

# Profile Router
get/profile
post/profile/edit
post/profile/passsword

# ConnectionRequest Router
post/request/send/:status/user:id // satuts = interested or uninterested 
post/request/review/:status/request:id // status = accepted or rejected

# User Router
get/requests/recieved 
get/user/matches or connections
get/user/feed

# pagination

/feed?page=1&limit=10 => 1-10 // .skip(0) & .limit(10)
/feed?page=2&limit=10 => 10-20 // .skip(10) & .limit(10)
/feed?page=3&limit=10 => 20-30 // .skip(20) & .limit(10)