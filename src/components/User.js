import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BlogTile from './subcomponents/BlogTile';
import axios from 'axios';

// import axios

class User extends Component{
    constructor(){
        super()

        this.state={
            user: {},
            posts: []
        }
    }

    // insert componentWillMount
    componentWillMount(){
        axios.get(`/api/users/${this.props.match.params.id}`).then(res=>{
            this.setState({ user: res.data })
        })
        axios.get(`/api/blogs/${this.props.match.params.id}`).then(res=>{
            this.setState({posts: res.data})
        })
               
    }
    

    render(){
        let posts = [];
        const user = this.state.user
        let copyPosts = this.state.posts;
        (this.state.posts.length > 0) ? copyPosts.map((c,i)=><BlogTile key={i} blog={c}/>) : false;
        return (
            <div className='content'>
                <div className="profile">
                        {user.img ? <img src={user.img} alt="profile pic"/> :<img src={'https://unsplash.it/300/?random'} alt="profile pic"/>}
                        <span>
                            <h1>{user.name}</h1>
                            <p>{user.desc}</p>
                            <Link to={`/user/${user.id}/edit`}>
                                <button className="edit-user">Edit User</button>
                            </Link>
                        </span>
                </div>
                <div className="post-list">
                    <h2>Posts by User:</h2>
                    {posts.length? posts : <p>No Blog Posts from this User</p>}
                </div>
            </div>
        )
    }
}

export default User