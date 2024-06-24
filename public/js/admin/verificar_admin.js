const verify_admin_server_side = async () => {

    const token = localStorage.token;

    try {
        const checkadmin = await fetch('http://18.231.252.59/api/user/isAdmin', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': token
            }
        });
        
        const response = await checkadmin.json();
    
        if(response.status !== 'Success'){
            window.location.href = '/'
        }
    } catch (error) {
        window.location.href = '/'
    }
}

const verify_role = () => { 
    const role = localStorage.role;

    if(role !== 'role-admin'){
        window.location.href = '/'
    }
}


verify_role();
verify_admin_server_side();