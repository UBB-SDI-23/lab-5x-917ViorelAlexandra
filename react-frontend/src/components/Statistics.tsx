import { Button, Container } from "@mui/material";
import { Link } from 'react-router-dom';

export const Statistics = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/statisticsplayers/avgyoe">
        Tennis players ordered by avg yoe of coaches
      </Button>
   
      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/statisticsplayers/grandslam">
        Top 3 tennis players registered in GS
      </Button>

      <Button style={{color:"whitesmoke", border: '1px solid whitesmoke'}} component={Link} sx={{ mr: 3 }} to="/statisticcoaches/yoe">
       Coaches Filtered By Years Of Experience
      </Button>
    
    </Container>

  );
};