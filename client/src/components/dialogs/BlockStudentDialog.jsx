import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const BlockStudentDialog = () => {
    const {students} = useSelector((state)=> state.student_info)
    const [block,setBlock] = useState(false)
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const blockStudent = async() =>{
    setBlock(!block)
    try {
      setBlock(!block)
        const respnonse = await axios.put(`http://localhost:5000/admin/student/block/${students._id}`)
        
        setOpen(false);
    } catch (error) {
        console.log(error)
    }
}

useEffect(()=>{},[block])
  return (
    <div>
      <div>
        <Button variant="contained" color='primary' onClick={handleClickOpen}>
        {students.isBlocked?"Unblock Student":"Block Student"}
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to block this student?"}</DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button onClick={blockStudent} color='primary'>Yes</Button>
        </DialogActions>
      </Dialog>
      
    </div>
    </div>
  )
}

export default BlockStudentDialog
