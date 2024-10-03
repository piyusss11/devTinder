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
get/user/feed
get/user/matches or connections