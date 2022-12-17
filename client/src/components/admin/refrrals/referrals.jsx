import './referrals.css'

const Referrals = ({ title, uid }) => {
    return (
        <>
            <div className="card__header">
                <h4 className='card__title'>{title}</h4>
            </div>
            <div className="card__body">
                <p className='referral__link'>
                    <span>My Referrals Code:</span> &nbsp;
                    <a>{uid}</a>
                </p>
                <div className="video__table__wrapper">
                    <table className='list__table__wrapper'>
                        <thead className='list__table__header'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Referrals