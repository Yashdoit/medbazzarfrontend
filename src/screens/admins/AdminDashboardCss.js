import makeStyles from '@mui/styles/makeStyles';

export const DashboardStyle = makeStyles({
    mainBox:
    {
        width:'100%',
        height:'100%'

    },

    leftBarStyle:
    {
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        padding:5,
        margin:10,
        justifyContent:'center'
    },
    nameStyle:
    {
        fontFamily:'kanit',
        marginTop:5,
        fontSize:16,
        fontWeight:'bold',
        marginBottom:2,
        color:'black'


    },
    emailStyle:
    {
        fontFamily:'kanit',
        fontSize:12,
        fontWeight:'bold',
        color:'#636e72'
    },
    phoneStyle:
    {
        fontFamily:'kanit',
        fontSize:12,
        fontWeight:'bold',
        color:'#636e72'
    },
    menuStyle:
    {
        marginInline:'2px',
    },

    menuItemStyle:
    {
        fontFamily:'Kanit',
        fontSize:13,
        fontWeight:'bold'
    }


})