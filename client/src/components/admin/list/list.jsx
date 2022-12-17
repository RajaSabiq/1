import './list.css'
import { Link } from 'react-router-dom'
import Api from "../../../api/api";

const List = ({ title, data }) => {

  const deleteContent = async (aid) => {
    const res = await Api.deleteVideo({ aid: aid })
    if (res.status === 200) {
      window.location.reload()
    }
  }

  return (
    <>
      <div className="card__header">
        <h4 className='card__title'>{title}</h4>
      </div>
      <div className="card__body">
        <div className="video__list__cont">
          <div className="video__list__header">
            <Link to='/admin/upload'>
              <i className='fa fa-plus'></i>
              <span>Add New</span>
            </Link>
          </div>
          <div className="video__table__wrapper">
            <table className='list__table__wrapper'>
              <thead className='list__table__header'>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Thumbnail</th>
                  <th>Video</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ?
                  data.map(item => (
                    <tr key={item.aid}
                    >
                      <td>#{item.aid}</td>
                      <td>{item.title}</td>
                      <td><a href={item.thumbnailUrl} target="_blank" rel="noopener noreferrer">{item.thumbnail}</a></td>
                      <td><a href={item.assetUrl} target="_blank" rel="noopener noreferrer">{item.asset}</a></td>
                      <td>
                        <p className="list__action">
                          <i onClick={() => deleteContent(item.aid)} className='fa fa-trash'></i>
                          <a href={`/video-detail/${item.aid}`} target="_blank" rel="noopener noreferrer">
                            <i className='fa fa-eye'></i>
                          </a>
                        </p>
                      </td>
                    </tr>
                  ))
                  : 'No data Found'
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default List