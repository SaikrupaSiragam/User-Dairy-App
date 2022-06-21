import {useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

 const UploadImages = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const usersdairy_id=location.state.usersdairy_id;
    const userid=location.state.userid;
    console.log(usersdairy_id);
    const regtoken = localStorage.getItem('regtoken')
    const token = regtoken.replaceAll('"', '');
    const [error,setError]=useState();
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('usersdairy_id',usersdairy_id)
        for(let i = 0; i < files.length; i++) {
            data.append('file', files[i]);
        }
        console.log(files);
        axios.post(`/images/${usersdairy_id}`, data,{
              headers: {
                authorization: token,
              },
            })
            .then((response) => {
                console.log(response);
               navigate('/userdairy',{ state: { userid: location.state.userid,usersdairy_id:usersdairy_id } })
            })
            .catch((e) => {
                setError('Upload Error')
            })
    };

    return (
        <div className='edit-card'>
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="card">
                
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       multiple/>
            <p>{error}</p>
            <button className='update-button'>UploadImages</button>
            <button className='update-button'
            onClick={()=>navigate(`/userdairy`, {
            state: { userid: userid }
          })}
            >Cancel</button>
             </div>
        </form>
        </div>
    )
};

export default UploadImages;