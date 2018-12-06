import React from 'react'

const Henkilo = ({key, name, number}) => {
    return(
        <p key={key}>
            {name} {number}
        </p>
    )
}

export default Henkilo