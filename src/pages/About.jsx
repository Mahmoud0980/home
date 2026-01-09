
import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-sky-100 py-12 px-6">
      {/* العنوان الرئيسي */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg">
          من نحن
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          سيما للعقارات تهدف لتقديم أفضل تجربة في شراء وتأجير العقارات في سوريا. نحن ملتزمون بالشفافية، الجودة، وخدمة العملاء الممتازة.
        </p>
      </header>

      {/* القيم والمميزات */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-2xl font-bold text-blue-600 mb-2">ثقة العملاء</h3>
          <p className="text-gray-600">
            نضع ثقة عملائنا في أولويتنا ونسعى لبناء علاقات طويلة الأمد.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-2xl font-bold text-blue-600 mb-2">عقارات متنوعة</h3>
          <p className="text-gray-600">
            نقدم خيارات متنوعة تناسب جميع الميزانيات والاحتياجات.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
          <h3 className="text-2xl font-bold text-blue-600 mb-2">خدمة متميزة</h3>
          <p className="text-gray-600">
            فريقنا دائمًا جاهز لتقديم المساعدة والإرشاد لكل عميل.
          </p>
        </div>
      </section>

      {/* قسم الفريق (اختياري) */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">فريقنا</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1603415526960-f8f72ed69f56?auto=format&fit=crop&w=500&q=80"
              alt="عضو الفريق"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-blue-600">أحمد علي</h3>
            <p className="text-gray-600">مدير المبيعات</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1614285028301-0aa9c1e75b6f?auto=format&fit=crop&w=500&q=80"
              alt="عضو الفريق"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold text-blue-600">سارة حسن</h3>
            <p className="text-gray-600">مديرة التسويق</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

