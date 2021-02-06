import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { questionPropsType } from "./../types/questiontypes";

const useStyles = makeStyles({
    root: {
      marginLeft: '35%',
      width: '400px'
    },
    title: {
      fontSize: 20,
    },
  });

export const QuestionCard: React.FC<questionPropsType> = ({question,options,callback}) => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {setValue(e.currentTarget.value)};
   
        return(
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {question}
                    </Typography>
                    <div>
                        <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e,value)}>
                    <FormControl component="fieldset">
                            {
                            options.map((obj: string, ind: number) => {
                                return (
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value={obj} control={<Radio />} label={obj} />
                                    </RadioGroup>
                            )})}   
                        <input type="submit" className="submit"/>                        
                    </FormControl>
                    </form>
                    </div>
                </CardContent>
    </Card>
        )
}