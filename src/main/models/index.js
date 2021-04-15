const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const Sequelize = require("sequelize")
const config = require("../../../config/db")

const db = {}

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  port: config.PORT,
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  dialect: 'postgres',
  define: {
    timestamps: false,
    freezeTableName: true
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQL database:', config.DB)
    sequelize.query(`
    BEGIN;

    INSERT INTO author (id, first_name, last_name, email, birth)
        SELECT x.id, x.first_name, x.last_name, x.email, x.birth
            FROM (
                SELECT 
                    1 as id,
                    'Franciele' as first_name, 
                    'Lithg' as last_name,
                    'francielelithg@gmail.com' as email,
                    TO_DATE('1995-01-06T00:00:00.000Z', 'YYYY/MM/DD') as birth
                UNION
                SELECT
                    2,
                    'Erick', 
                    'White',
                    'erickwhite@gmail.com',
                    TO_DATE('1997-11-01T00:00:00.000Z', 'YYYY/MM/DD')
            ) as x
        WHERE
            (SELECT COUNT(*) FROM author) <= 0;
          
    INSERT INTO publication (id, title, body, author_id, created_at, updated_at)
        SELECT y.id, y.title, y.body, y.author_id, y.created_at, y.updated_at
            FROM (
                SELECT 
                    1 as id,
                    'Example of publication title' as title, 
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet nisl purus in. Venenatis a condimentum vitae sapien. Lectus mauris ultrices eros in cursus turpis. Vivamus at augue eget arcu dictum varius. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Dictum at tempor commodo ullamcorper a lacus vestibulum. Facilisis gravida neque convallis a cras semper auctor neque. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Auctor neque vitae tempus quam pellentesque nec nam aliquam. Sagittis orci a scelerisque purus semper eget. Arcu felis bibendum ut tristique et egestas quis. Augue neque gravida in fermentum et. Eget gravida cum sociis natoque penatibus et magnis dis. Semper auctor neque vitae tempus quam pellentesque. Et malesuada fames ac turpis egestas. Interdum posuere lorem ipsum dolor. Auctor augue mauris augue neque gravida. Blandit turpis cursus in hac habitasse platea dictumst. Malesuada proin libero nunc consequat interdum varius. Suspendisse potenti nullam ac tortor vitae purus faucibus. Sit amet porttitor eget dolor morbi non arcu risus. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Massa massa ultricies mi quis hendrerit. Sed viverra ipsum nunc aliquet bibendum enim facilisis. Vitae aliquet nec ullamcorper sit amet risus nullam eget. Dui id ornare arcu odio ut sem nulla. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Gravida in fermentum et sollicitudin ac.' as body,
                    1 as author_id,
                    NOW() as created_at,
                    NOW() as updated_at
                UNION
                SELECT
                    2,
                    'This is the second blog post', 
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit libero volutpat sed cras ornare arcu dui vivamus arcu. Sagittis vitae et leo duis ut diam quam nulla porttitor. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sit amet nisl suscipit adipiscing bibendum. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Luctus accumsan tortor posuere ac. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Lobortis elementum nibh tellus molestie nunc non. Congue nisi vitae suscipit tellus mauris a diam.',
                    2,
                    NOW() as created_at,
                    NOW() as updated_at
            ) as y
        WHERE
            (SELECT COUNT(*) FROM publication) <= 0;
            
        COMMIT;
    END;
    `)
  })
  .catch(err => {
    console.error('Unable to connect to SQL database: ', config.DB, err)
  })

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db