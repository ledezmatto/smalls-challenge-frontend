import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faStar, faEye } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

import image from "../../assets/images/rp-1.jpg";
import placeholder from "../../assets/images/placeholder-image.png";

const Post = () => {

	const [posts, setPosts] = useState([]);
	const [favPosts, setFavPosts]:any = useState([]);

	useEffect(()=>{
		getRedditTopPost();
		getMyFavs();
	},[])

	const getRedditTopPost = () =>{
      	fetch('https://www.reddit.com/r/redditdev/top.json', {
          	method: 'GET'
        }).then(res => res.json())
        .then(response => {
        	setPosts(response?.data?.children)
        	response?.data?.children.map((data:any,index:any)=>{
        		savePost(data?.data)
        	})
        })
        .catch(error => console.error('Error:', error));
	}

	const getMyFavs = () =>{
      	fetch('http://127.0.0.1:8000/api/post-fav/', {
          	method: 'GET'
        }).then(res => res.json())
        .then(response => {
        	setFavPosts(response?.results);
        })
        .catch(error => console.error('Error:', error));
	}

	const savePost = (post:any) =>{
		let bodyVar = {
			"post_id": post?.id,
			"is_fav": false,
			"author": post?.author,
			"title": post?.title,
			"url": post?.url,
			"comments": post?.num_comments,
			"created_at": post?.created_utc,
			"readed": false
		}
      	fetch('http://127.0.0.1:8000/api/post-fav/', {
          	method: 'POST',
          	body: JSON.stringify(bodyVar),
          	headers:{
            	'Content-Type': 'application/json'
          	}
        }).then(res => res.json())
        .then(response => {
        	console.log(response)
        })
        .catch(error => console.error('Error:', error));
	}

	const checkReaded = (post_id:string) =>{
		let bodyVar = {
			"readed" : true
		}
      	fetch('http://127.0.0.1:8000/api/check-fav/'+post_id+'/', {
          	method: 'PUT',
          	body: JSON.stringify(bodyVar),
          	headers:{
            	'Content-Type': 'application/json'
          	}
        }).then(res => res.json())
        .then(response => {
        	// Update favPosts readed
        	let index = favPosts.findIndex((post:any) => post?.post_id === post_id);
        	if(index !== -1) {
        		let newArr:any = [...favPosts];
        		newArr[index] = {
        			...newArr[index],
        			"readed":true
        		};
		    	setFavPosts(newArr);
        	} 
        })
        .catch(error => console.error('Error:', error));
	}

	const saveOrRemoveFav = (post_id:string, boolValue:boolean) =>{
		let bodyVar = {
			"is_fav" : boolValue
		}
      	fetch('http://127.0.0.1:8000/api/check-fav/'+post_id+'/', {
          	method: 'PUT',
          	body: JSON.stringify(bodyVar),
          	headers:{
            	'Content-Type': 'application/json'
          	}
        }).then(res => res.json())
        .then(response => {
        	// Update favPosts
        	let index = favPosts.findIndex((post:any) => post?.post_id === post_id);
        	if(index === -1) {
        		let newArr:any = [...favPosts,response];
		    	setFavPosts(newArr);
        	}else{
        		let newArr:any = [...favPosts];
        		newArr[index] = {
        			"is_fav":false
        		};
		    	setFavPosts(newArr);
        	} 
        })
        .catch(error => console.error('Error:', error));
	}

    return (
    	<>
		    <div className="page-title">
		        <div className="container">
		            <h2>Reddit Top Posts</h2>
		            <ul className="nav">
		                <li>Fullstack Asessment</li>
		            </ul>
		        </div>
		    </div>

		    <div className="container pt-120">
		        <div className="row">
		            <div className="col-lg-4">
		                <div className="my-sidebar">
		                    <div className="widget widget-recent-post">
		                        <h4 className="widget-title">
		                            All Posts
		                        </h4>
		                        <div className="widget-content">
		                        	{posts.length <= 0 && (
	                        			<Skeleton height={50} count={3} />
		                        	)}
		                        	{posts.map((data:any,index:any)=>{
		                        		return(
				                            <div className="wrp-cover">
				                                <div className="post-thumb">
				                                    <a href={data?.data?.url} target="_blank">
				                                        <img src={data?.data?.media || placeholder} width={50} height={50} alt="" className="img-fluid" />
				                                    </a>
				                                </div>
				                                <div className="post-title">
				                                    <a href={data?.data?.url} target="_blank">{data?.data?.title}</a>  
				                                </div>
				                            </div>
				                        )
			                        })}
		                        </div>
		                    </div>
		                </div>                
		            </div>
		            <div className="col-lg-8 pb-50">
                    	{posts.length <= 0 && (
                    		<>
	                			<Skeleton height={200} count={2} />
                			</>
                    	)}
		            	{posts.map((data:any,index:any)=>{
		            		let include:any = favPosts.some((post:any) => post?.post_id === data?.data?.id);
		            		let includeReaded:boolean = favPosts.some((post:any) =>{
		            			return post?.readed === true && post?.post_id === data?.data?.id
		            		});
		            		let isFav:boolean = include;
		            		return(
				                <div className="post-default post-has-right-thumb" key={index}>
				                    <div className="d-flex flex-wrap">
				                        <div className="post-thumb align-self-stretch order-md-2">
				                            <a href="blog-details.html">
				                            	{data?.data?.media?.type === 'youtube.com' &&(
					                                <img src={data?.data?.media?.oembed?.thumbnail_url} style={{width:'100%', maxWidth:255, height:'auto'}} />
				                            	)}
				                            	{data?.data?.media?.type !== 'youtube.com' &&(
					                                <img src={data?.data?.media || placeholder} style={{width:'100%', maxWidth:255, height:'auto'}} />
				                            	)}
				                            </a>
				                        </div>
				                        <div className="post-data order-md-1">
				                            <div className="title">
				                                <h2><a style={{cursor:'pointer'}} href={data?.data?.url} target="_blank" onClick={()=> checkReaded(data?.data?.id)}>{data?.data?.title}</a></h2>
				                            </div>
				                            <div className="cats">By <a href="#">{data?.data?.author}</a></div>
				                            <ul className="nav meta align-items-center">
				                                <li className="meta-date"><strong>{moment(data?.data?.created_utc*1000).format('L')}</strong> {moment(data?.data?.created_utc*1000).fromNow()}</li>
				                                <li className="meta-comments"><FontAwesomeIcon icon={faComment} /> {data?.data?.num_comments}</li>
				                                <li className="meta-comments">
				                                	{includeReaded
				                                		?
					                                	<a style={{cursor:'pointer'}} href={data?.url} target="_blank">
					                                		<FontAwesomeIcon icon={faEye} /> Readed Post
					                                	</a>
					                                	:
					                                	<a style={{cursor:'pointer'}} href={data?.url} target="_blank" onClick={()=> checkReaded(data?.data?.id)}>
					                                		<FontAwesomeIcon icon={faEye} /> Unread Post
					                                	</a>
				                                	}
				                                </li>
				                            </ul>
				                            {isFav 
				                            	?
						                            <div style={{cursor:'pointer', color:'black'}} onClick={()=> saveOrRemoveFav(data?.data?.id, false)}>
						                            	<div className="meta-comments">
						                            		<FontAwesomeIcon icon={faStar} />
						                            		<strong> My Favourites</strong>
						                            	</div>
						                            </div>
				                            	:
						                            <div style={{cursor:'pointer', color:'black'}} onClick={()=> saveOrRemoveFav(data?.data?.id, true)}>
						                            	<div className="meta-comments">
						                            		<FontAwesomeIcon icon={faStar} />
						                            		<strong> Add to My Favourites</strong>
						                            	</div>
						                            </div>
				                        	}
				                        </div>
				                    </div>
				                </div>
				            )
		            	})}
		            </div>
		            
		        </div>
		    </div>
	    </>
    );
};

export default Post;
