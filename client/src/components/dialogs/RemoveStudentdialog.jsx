import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RemoveStudentdialog = () => {
    const {students} = useSelector((state)=> state.student_info)
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const deleteStudent = async() =>{
    try {
        const respnonse = await axios.delete(`http://localhost:5000/admin/student/${students._id}`)
        navigate('/admin/dashboard/student')
        setOpen(false);
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div>
        <Button variant="contained" color='success' onClick={handleClickOpen}>
        Remove Student
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to remove this student?"}</DialogTitle>
       
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button onClick={deleteStudent} color='primary'>Yes</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  )
}

export default RemoveStudentdialog
