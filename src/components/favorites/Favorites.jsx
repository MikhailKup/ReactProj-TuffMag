import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItemFromFavorites } from '../../features/user/userSlice';

import styles from '../../styles/Cart.module.css'

const Favorites = () => {
	const dispatch = useDispatch();
  const { favorites } = useSelector(({ user }) => user);

  const removeItem = (id) => {
    dispatch(removeItemFromFavorites(id));
  };

	return (
		<section className={styles.cart}>
      <h2 className={styles.title}>Your favotites</h2>

      {!favorites.length ? (
        <div className={styles.empty}>Favotites is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {favorites.map((item) => {
              const { title, category, image, price, id } = item;

              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
	);
};

export default Favorites