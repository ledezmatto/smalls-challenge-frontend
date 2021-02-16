import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faStar, faEye } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';

import image from "../../assets/images/rp-1.jpg";
import placeholder from "../../assets/images/placeholder-image.png";

const FavPost = () => {

	const [posts, setPosts]:any = useState([]);
	const [favPosts, setFavPosts]:any = useState([]);
	const [nextPage, setNextPage]:any = useState(null);
	const [previousPage, setPreviousPage]:any = useState(null);
	const [paginationCount, setPaginationCount]:any = useState([]);

	useEffect(()=>{
		getMyFavs();
	},[])

	const getMyFavs = (url?:any) =>{
		let finalUrl = url ? url : 'http://127.0.0.1:8000/api/post-fav/?limit=2'
      	fetch(finalUrl , {
          	method: 'GET'
        }).then(res => res.json())
        .then(response => {
        	setPosts(response?.results)
        	if(response?.next){
        		setNextPage(response?.next)
        		setPaginationCount(response?.count)
        	}else{
        		setNextPage(null)
        	}

        	if(response?.previous){
        		setPreviousPage(response?.previous)
        	}else{
        		setPreviousPage(null)
        	}
        })
        .catch(error => console.error('Error:', error));
	}
	
	const removeFav = (post_id:string, boolValue:boolean) =>{
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
        	let index = posts.findIndex((post:any) => post?.post_id === post_id);
        	if(index !== -1) {
        		let newArr:any = posts.splice(index, 1);
		    	setPosts(newArr);
        	}
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
        })
        .catch(error => console.error('Error:', error));
	}

	const unFavAllPosts = () =>{
      	fetch('http://127.0.0.1:8000/api/unfav-allposts/', {
          	method: 'GET'
        }).then(res => res.json())
        .then(response => {
        	setPosts([])
        	setPreviousPage(null)
        	setNextPage(null)
        })
        .catch(error => console.error('Error:', error));
	}

    return (
    	<>
		    <div className="page-title">
		        <div className="container">
		            <h2>Reddit My Favs</h2>
		            <ul className="nav">
		                <li>Fullstack Asessment</li>
		            </ul>
		        </div>
		    </div>

		    <div className="container pt-120">
		        <div className="row">
		            <div className="offset-lg-2 col-lg-8">
		            	{posts.length <= 0 && (
	            			<h3 style={{textAlign:'center'}}>No favs post</h3>
		            	)}
		            	{posts.map((data:any,index:any)=>{
		            		return(
				                <div className="post-default post-has-right-thumb" key={index}>
				                    <div className="d-flex flex-wrap">
				                        <div className="post-thumb align-self-stretch order-md-2">
				                            <a href="blog-details.html">
				                            	{data?.media?.type === 'youtube.com' &&(
					                                <img src={data?.media?.oembed?.thumbnail_url} style={{width:'100%', maxWidth:255, height:'auto'}} />
				                            	)}
				                            	{data?.media?.type !== 'youtube.com' &&(
					                                <img src={data?.media || placeholder} style={{width:'100%', maxWidth:255, height:'auto'}} />
				                            	)}
				                            </a>
				                        </div>
				                        <div className="post-data order-md-1">
				                            <div className="title">
				                                <h2>{data?.title}</h2>
				                            </div>
				                            <div className="cats">By <a href="category-result.html">{data?.author}</a></div>
				                            <ul className="nav meta align-items-center">
				                                <li className="meta-date"><a href="#"><strong>{moment(data?.created_at*1000).format('L')}</strong> {moment(data?.created_at*1000).fromNow()}</a></li>
				                                <li className="meta-comments"><a href="#"><FontAwesomeIcon icon={faComment} /> {data?.comments}</a></li>
				                                <li className="meta-comments">
				                                	{data?.readed
				                                		?
						                                	<a href={data?.url} target="_blank" onClick={()=> checkReaded(data?.post_id)}>
						                                		<FontAwesomeIcon icon={faEye} /> Readed Post
						                                	</a>
				                                		:
						                                	<a href={data?.url} target="_blank" onClick={()=> checkReaded(data?.post_id)}>
						                                		<FontAwesomeIcon icon={faEye} /> Unread Post
						                                	</a>
				                                	}
				                                </li>
				                            </ul>
				                            <div style={{cursor:'pointer', color:'black'}} onClick={()=> removeFav(data?.post_id, false)}>
				                            	<div className="meta-comments">
				                            		<FontAwesomeIcon icon={faStar} />
				                            		<strong> My Favourites</strong>
				                            	</div>
				                            </div>
				                        </div>
				                    </div>
				                </div>
				            )
		            	})}
		                <div className="post-pagination d-flex justify-content-center">
		                	{previousPage !== null && (
		                    	<a onClick={()=>getMyFavs(previousPage)}>{'<'}</a>
		                	)}
		                	{nextPage !== null && (
		                    	<a onClick={()=>getMyFavs(nextPage)}>{'>'}</a>
		                	)}
		                </div>
		                <div style={{textAlign:'center'}}>
		                	{posts.length >= 1 && (
		                		<p style={{cursor:'pointer'}} onClick={()=> unFavAllPosts()}>Unfav all posts :(</p>
		                	)}
		                </div>
		            </div>
		        </div>
		    </div>
	    </>
    );
};

export default FavPost;
