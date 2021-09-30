const Table = observer(() => {
    const [search, setSearch] = useState('')
    const [condition, setCondition] = useState('')
    const [column, setColmn] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        
    );
});

export default Table;
