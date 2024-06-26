import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --white: rgb(255, 255, 255);

        --grey: #373838;
        --dark-grey: #1F2020;
        --black: #000000;
        
        --red: #DC2625;
        --blue: #10C4E6;
        --yellow: #FEFC99;

        --primary-color: var(--blue);
        --secondary-color: var(--yellow);
        --tertiary-color: var(--red);
        --bg-color: var(--grey);
        --text-color: var(--white);
        --border-color: var(--dark-grey);
        --border-radius: 0.6rem;
    }


    body {
        margin: 0;
        color: var(--white);
        font-family: Helvetica Neue, sans-serif;
    }
`;

export default GlobalStyles;
