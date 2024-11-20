const Content = ({data, input, range}) => {       
    return(
        <div className="content-home-container">
            <div className="content-home-container-snd">

            {data.offers.map((result, index) => {
                const name = result.product_name;
                if(name !== undefined) {
                    if(name.includes(input)) {                        
                        if(range[0] <= result.product_price && range[1] >= result.product_price){

                            return(
                                <div className="item" key={index}>
                                    <div className="item-username">
                                        {result.owner.account.avatar ? <img  className="user-avatar" src={result.owner.account.avatar.url} alt="avatar user" /> : ""}
                                        {result.owner.account.username}
                                    </div>
                                    <div className="item-img-container">
                                        <img  className="item-img" src={result.product_image[0].secure_url} alt="image item" /> 
                                    </div>
                                    <div className="item-price">
                                        {result.product_price} €
                                    </div>
                                    <div className="item-taille">
                                        {result.product_details[0].TAILLE}
                                    </div>
                                    <div className="item-brand">
                                        {result.product_details[0].MARQUE}
                                    </div>
                                </div>
                            )
                        }
                    }
                }
            })}
            </div>
        </div>
    )
}

export default Content;