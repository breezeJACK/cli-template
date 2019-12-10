const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}


export default [
    // user login
    {
        url: "/user/login",
        type: "post",
        response: config => {
            const {
                username
            } = config.body
            const token = tokens[username]
            if (!token) {
                return {
                    status: 204,
                    message: 'Account and password are incorrect.'
                }
            }
            return {
                status: 200,
                success: true,
                data: token
            }
        }
    }
]