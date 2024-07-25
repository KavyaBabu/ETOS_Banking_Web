import React, { useState, useEffect, useRef } from 'react';

const data = [
  {
    id: 'current-account',
    title: 'Current Account',
    content: `
        <p>Rewards when you spend, with 1% cashback.</p>
        <p>We know a little extra cash is always welcome. That's why we give you 1% cashback on your everyday debit card and contactless spending for your first 12 months with us.</p>
        <p>18+, UK residents. Cashback available for your first 12 months as a new customer. Max £15 per month. Cashback exceptions apply.</p>
    `,
    image: '/Images/current-account.jpg',
    buttonText: 'Apply for Current Account',
  },
  {
    id: 'joint-account',
    title: 'Joint Account',
    content: `
        <p>Manage shared expenses easily.</p>
        <p>Our joint accounts make it simple for you and your partner to manage your finances together, with features like shared statements and account alerts.</p>
        <p>18+, UK residents, valid passport, BRP, or driving license required.</p>
    `,
    image: '/Images/debit-account.jpg',
    buttonText: 'Apply for Joint Account',
  },
  {
    id: 'debit-card',
    title: 'Debit Card',
    content: `
        <p>Convenient and secure access to your money.</p>
        <p>Our debit cards provide a simple way to manage your everyday spending, with features like contactless payments and fraud protection.</p>
        <p>18+, UK residents, valid passport, BRP, or driving license required.</p>
    `,
    image: '/Images/debit-card.png',
    buttonText: 'Apply for Debit Card',
  },
  {
    id: 'credit-card',
    title: 'Credit Card',
    content: `
        <p>Get rewarded when you spend, with 1% cashback on your everyday purchases.</p>
        <p>Enjoy 1% cashback on your everyday debit card and contactless spending for your first 12 months with us. A little extra cash is always welcome!</p>
        <p>18+, UK residents, valid passport, BRP, or driving license required. Valid Face ID or fingerprint authentication needed.</p>
    `,
    image: '/Images/current-account.jpg',
    buttonText: 'Apply for Credit Card',
  }
];

const AccountContainer = () => {
  const [activeTab, setActiveTab] = useState(data[0].id);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sectionRefs.current.forEach((ref, index) => {
        if (ref.offsetTop <= scrollPosition && ref.offsetTop + ref.clientHeight > scrollPosition) {
          setActiveTab(data[index].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (id) => {
    setActiveTab(id);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <h3 className="text-center">Personal Banking Solutions</h3>
      <p className="text-center description">
        Discover a world of tailored personal banking services designed to meet your financial needs and lifestyle. 
        Our range of offerings includes versatile debit and credit cards, joint accounts for shared financial management, and seamless payment solutions through our eBanking platform. 
        <br/><br/>Whether you're looking to manage everyday expenses, build credit, or handle shared finances, our personalized plans ensure convenience, security, and efficiency. Join us to experience banking that adapts to your life.
      </p>
      <div className="tabs">
        {data.map((item) => (
          <button
            key={item.id}
            className={`tab ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="content">
        {data.map((item, index) => (
          <section
            key={item.id}
            id={item.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="panel"
          >
            <div className="panel-content">
              <div className="text">
                <h2>{item.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <button className="apply-button">{item.buttonText}</button>
              </div>
              <div className="image">
                <img src={item.image} alt={item.title} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AccountContainer;
