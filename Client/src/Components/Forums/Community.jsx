import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GrUserAdmin } from 'react-icons/gr';
import { MdSportsGymnastics } from 'react-icons/md';
import { useLoaderData } from 'react-router-dom';

const Community = () => {
    const forumPost = useLoaderData();
    console.log(forumPost);
    return (<>
    <Helmet>
        <title>Community Post</title>
    </Helmet>
        <div className='space-y-3'>
            <h1 className="text-xl">Find All The Questions Here...</h1>
            <div className='flex flex-col gap-3'>
                {
                    forumPost.map(post => <div key={post._id} className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked /> 
                    <div className="collapse-title text-xl font-medium">
                      <p>{post.title}</p>
                      <span className='flex gap-2 items-center'> By: {
                        post.who_posted == 'trainer' && <MdSportsGymnastics/>}{
                            post.who_posted == 'admin' && <GrUserAdmin/>
                        } </span>
                    </div>
                    <div className="collapse-content"> 
                      <p>{post.content}</p>
                    </div>
                  </div>)
                }
            </div>
        </div>
        </>
    );
};

export default Community;