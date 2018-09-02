import axios from 'axios';
import { URL } from '../../env'

export const getLog = function(context){
    return new Promise((resolve,reject)=>{
        let that = context;
        axios.get(URL).then((response)=>{ 
            if(response.data.ok){
                that.props.updateMessages(response.data.messages)
                resolve();
            }
        }).catch(err=>{ 
            console.error(err) 
            resolve();
        });
    })
}