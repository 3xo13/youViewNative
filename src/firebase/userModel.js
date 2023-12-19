export default class User {
    constructor(
        id,
        username,
        email,
        password,
        profile_picture,
        channels,
        bio,
        balance,
        posts,
        notefications,
        viewCount,
        groups,
    ) {
        this.id = id
        this.username = username
        this.email = email
        this.password = password
        this.profile_picture = profile_picture
        this.channels = channels
        this.bio = bio
        this.balance = balance
        this.posts = posts
        this.notefications = notefications
        this.viewCount = viewCount
        this.groups = groups
    }

    addView(){
        this.viewCount = this.viewCount + 1
    }

    addBalance(amount){
        this.balance = this.balance + amount
    }

    newPost(post, withdrawAmount){
        this.posts = [...this.posts, post]
        this.videoCount = this.videoCount + 1
        this.balance = this.balance - withdrawAmount
    }
}