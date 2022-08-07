import './Bookmark.css'

function Bookmark({ item, setValue, bookmark, setBookmark }) {
	const handleDeleteBookmark = (bookmarkId) => {
		const findBookmark = bookmark.filter((e) => e !== bookmarkId);
		setBookmark(findBookmark)
	};
	return (
		<li className='city-favorite__item'>
			<button className='bookmark-btn' data-button-id={item} onClick={() => setValue(item)}>
				{item}
			</button>
			<span className="delete-btn"
				data-del-id={item}
				onClick={(evt) => {
					handleDeleteBookmark(evt.target.dataset.delId);
				}}>
				⌫
			</span>
		</li>
	);
}

export default Bookmark;
