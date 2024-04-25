import { Link } from "react-router-dom";

const Page404 = () => {
    return (  
        <section style={{ backgroundColor: '#f9f9f9', padding: '60px 0' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ margin: '0 auto', maxWidth: '600px' }}>
                        <div style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '40px' }}>
                            <h1 style={{ fontSize: '72px', color: '#333', margin: '0' }}>404</h1>
                            <div style={{ marginTop: '20px' }}>
                                <h3 style={{ fontSize: '24px', color: '#333', marginBottom: '20px' }}>Looks like you're lost</h3>
                                <p style={{ fontSize: '16px', color: '#666' }}>The page you are looking for is not available!</p>
                                <Link to='/' style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>    );
}
 
export default Page404;