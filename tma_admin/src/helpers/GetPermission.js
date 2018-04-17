
import AuthService from '../utils/AuthService';
import { API, ACCESS_TYPE } from '../constants';

const role_permission_url = API.ROLE_PERMISSIONS;



const CheckUserType = async() => { 

    const Auth = new AuthService();
    const profile = Auth.getProfile();
    const is_client = profile.is_client;

    return is_client;
    
}

const GetPermission = async(mod) => {

    const Auth = new AuthService();
    const Token = Auth.getToken();
    const profile = Auth.getProfile();
    
    const role_id = profile.role_id;

    const url = role_permission_url + "getPermissionByRoleAndModule/";

    const data = { 
        role_id: role_id,
        module_id: mod,
    }

    var access_type = ACCESS_TYPE.NOACCESS;

    const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Token
            })
        }).then((response) => {
            
            
            return response.json();
            
        }).then((res) => {
            access_type = ACCESS_TYPE.NOACCESS;
            if(res.length > 0) {
                var reslt = res[0];
                access_type = reslt.access_type;
            }
            
            return access_type;
        
        })
    .catch(function(err){
        console.log(err);
        return access_type;
    })

    return result;

}

export { GetPermission, CheckUserType };