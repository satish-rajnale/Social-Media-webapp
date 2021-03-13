import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64'; 
import useStyles from './styles';
import { useDispatch , useSelector} from 'react-redux';
import { createPost , updatePost} from '../../actions/posts'




const Form = ({currentId, setCurrentId}) =>{
    const post =useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null);
    const classes= useStyles();
    const dispatch= useDispatch();
    
    useEffect(() => {
            if(post) setPostData(post);
    }, [post]);
    
    
    const handleSubmit=(e)=>{
        e.preventDefault();

        if(currentId===0){
            dispatch(updatePost(currentId, postData));clear();
        }else{
            dispatch(createPost(postData));clear();
        }

    };
    const clear=()=>{
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    };


    const  [postData, setPostData] = useState({
        creator:'',
        title:'',
        tags:'',
        message:'',
        selectedFile:''
    });

    return(
       <Paper className={classes.paper} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Creating Memory</Typography>
            <TextField 
                name="creator"
                variant="outlined"
                label="creator"
                fullWidth
                value={postData.creator}
                onChange={(e)=>setPostData({...postData, creator:e.target.value})}
            />
             <TextField 
                name="title"
                variant="outlined"
                label="title"
                fullWidth
                value={postData.title}
                onChange={(e)=>setPostData({...postData, title:e.target.value})}
            />
             <TextField 
                name="tags"
                variant="outlined"
                label="tags"
                fullWidth
                value={postData.tags}
                onChange={(e)=>setPostData({...postData, tags:e.target.value})}
            />
             <TextField 
                name="message"
                variant="outlined"
                label="message"
                fullWidth
                value={postData.message}
                onChange={(e)=>setPostData({...postData, message:e.target.value})}
            />
            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData, selectedFile: base64})} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" fullWidth size="large" type="submit">Submit</Button>
                <Button  variant="contained" color="secondary" fullWidth size="small" onClick={clear}>Clear</Button>

            </div>
            </form>
       </Paper>
    )    
}
export default Form;