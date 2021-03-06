import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';



function InfoBox({title, cases, total}) {
    return (
        <Card className='infoBox' >
             <CardContent>
              
             <Typography  className='infoBox__title' color='textSecondary' >
                 {title}
             </Typography> 

             <h2  className='infoBox__cases' >
                 {cases} 
             </h2>

             <Typography   className='infoBox__totalv' color='textSecondary' >
                 {total} Total
             </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
