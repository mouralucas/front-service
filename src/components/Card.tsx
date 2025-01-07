import React, {ReactElement} from "react";

interface CardProps {
    children: any,
    marginTop?: string,
}

const Card = ({children, marginTop = 'mt-4'}: CardProps): ReactElement => {
    const subComponentList: string[] = Object.keys(Card);

    const subComponents = subComponentList.map((key) => {
        return React.Children.map(children, (child) =>
            child.type.displayName === key ? child : null
        );
    });


    return (
        <div className={marginTop}>
            <div className='card-default m-lg-3 overflow-auto'>
                {subComponents.map((component) => component)}
            </div>
        </div>
    )
}

const Header = (props: CardProps) => <div className='card-header'>{props.children}</div>;
Header.displayName = 'Header';
Card.Header = Header;

const Body = (props: CardProps) => <div className='card-body'>{props.children}</div>;
Body.displayName = 'Body';
Card.Body = Body;

const Footer = (props: CardProps) => <div className='card-footer'>{props.children}</div>;
Footer.displayName = 'Footer';
Card.Footer = Footer;

export default Card;