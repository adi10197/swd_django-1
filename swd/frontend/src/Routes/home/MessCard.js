import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ExpandableCard from "../../Components/ExpandableCard";

const MessChoice = (props) => {

    const chooseMess = () => {
        // Send mutations here
    }
    return(
        <div>
    <RadioButtonGroup name="messChoice" >
      <RadioButton
        value="A"
        label="A"
      />
      <RadioButton
        value="C"
        label="C"
      />
    </RadioButtonGroup>
    <FlatButton label="Submit" onClick={chooseMess} primary={true} />
    </div>
    );
}

const MessCard = (props) => {

  const { messOptionOpen, messCurrentChoice } = props;

var cardTitle = "Couldnt load mess option!"
console.log(messOptionOpen)
console.log(messCurrentChoice)

if (messOptionOpen && messOptionOpen.networkStatus === 7 && messCurrentChoice && messCurrentChoice.networkStatus === 7) {
  cardTitle = messOptionOpen.messoptionopen.openNow 
  ? ("Mess option for the month of "+ messOptionOpen.messoptionopen.month + " is open") 
: "Your current mess is " + messCurrentChoice.currentChoice.mess
  console.log(messOptionOpen)
}

  return(
<ExpandableCard title={cardTitle}> 
<MessChoice/>
 {/* { messOptionOpen.messoptionopen.openNow 
//     ? <MessChoice/>
//     : "Next Mess is at"
//  } */}
 </ExpandableCard>
  );
};

// Change these proptypes depedning on whether the error-handling mechanisms are
// implicit or explicit. Currently, they are assumed to be implicit.
MessCard.propTypes = {
  messOptionData: PropTypes.object,
  messCurrentChoice: PropTypes.object
};

export default MessCard;