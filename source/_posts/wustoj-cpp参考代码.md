---
title: wustoj-cpp参考代码
tags: [作业]
categories: [cpp]
cover: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
banner: https://i.postimg.cc/ZnCzZKvr/2cb79efe667b08d4b12e3b103d67653.jpg
topic: 学校课程
headline: 大标题
caption: 标题下方的小字
color: 标题颜色
description:
poster:
sticky:
mermaid:
katex:
mathjax:
author: scandi
references:
comments:
indexing:
breadcrumb:
leftbar:
rightbar: toc
h1:
type:
---

## 代码旨在直接解决题目要求，代码格式不规范请谅解

## 1.类和对象

### c++1001 时钟类 Clock 的设计

<!-- more -->

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Clock
{
public:
    Clock()
    {
        hour = 8;
        minute = 16;
        second = 24;
    }
    Clock(int h, int m, int s)
    {
        hour = h;
        minute = m;
        second = s;
    }
    int hour, minute, second;
    void Show()
    {
        cout << hour << ":" << minute << ":" << second << endl;
    }
    void Set(int hh, int mm, int ss)
    {
        hour = hh;
        minute = mm;
        second = ss;
    }
};

int main()
{
    Clock c1,c2(12,25,38);
    cout<<"Show object c1:";
    c1.Show();
    cout<<"Show object c2:";
    c2.Show();
    int h,m,s;
    cin>>h>>m>>s;
    cout<<"Reset and Show object c1:";
    c1.Set(h,m,s);
    c1.Show();
    cin>>h>>m>>s;
    cout<<"Reset and Show object c2:";
    c2.Set(h,m,s);
    c2.Show();
    return 0;
}
```

### c++1002 点类 Point 的设计

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Point
{
public:
    Point()
    {
        x = 10;
        y = 16;
    }
    Point(int xx, int yy)
    {
        x = xx;
        y = yy;
    }
    int x, y;
    void Show()
    {
        cout << "(" << x << "," << y << ")" << endl;
    }
    void Set(int xxx, int yyy)
    {
        x = xxx;
        y = yyy;
    }
};

int main()
{
    Point p1,p2(20,100);
    cout<<"Show object p1:";
    p1.Show();
    cout<<"Show object p2:";
    p2.Show();
    int x,y;
    cin>>x>>y;
    cout<<"Reset and Show object p1:";
    p1.Set(x,y);
    p1.Show();
    cin>>x>>y;
    cout<<"Reset and Show object p2:";
    p2.Set(x,y);
    p2.Show();
    return 0;
}

```

### c++1003 圆类 Circle 的设计

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Circle
{
public:
    Circle()
    {
        radius = 10;
    }
    Circle(double r)
    {
        radius = r;
    }
    double radius;
    void Set(double r)
    {
        radius = r;
    }
    double Get()
    {
        return radius;
    }
    double Circumference()
    {
        return (radius * 2 * 3.14);
    }
    double Square()
    {
        return (radius * radius * 3.14);
    }
};

int main()
{
    Circle c1;
    cout<<"Show object c1:"<<endl;
    cout<<"    radius="<<c1.Get()<<endl;
    cout<<"    Circumference="<<c1.Circumference()<<endl;
    cout<<"    Square="<<c1.Square()<<endl;
    double r;
    cin>>r;
    Circle c2(r);
    cout<<"Show object c2:"<<endl;
    cout<<"    radius="<<c2.Get()<<endl;
    cout<<"    Circumference="<<c2.Circumference()<<endl;
    cout<<"    Square="<<c2.Square()<<endl;
    cin>>r;
    cout<<"Reset and Show object c1:"<<endl;
    c1.Set(r);
    cout<<"    radius="<<c1.Get()<<endl;
    cout<<"    Circumference="<<c1.Circumference()<<endl;
    cout<<"    Square="<<c1.Square()<<endl;
    return 0;
}
```

### c++.1004 矩形类 Rectangle 的设计

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Rectangle
{
public:
    Rectangle()
    {
        width = 2;
        height = 2;
    }
    Rectangle(double w, double h)
    {
        width = w;
        height = h;
    }
    double width, height;
    void Set(double w, double h)
    {
        width = w;
        height = h;
    }
    double GetWidth()
    {
        return width;
    }
    double GetHeight()
    {
        return height;
    }
    double Perimeter()
    {
        return (width + height) * 2;
    }
    double Area()
    {
        return width * height;
    }
};

int main()
{
    Rectangle rect1;
    cout<<"Show object rect1:"<<endl;
    cout<<"    width="<<rect1.GetWidth()<<endl;
    cout<<"    height="<<rect1.GetHeight()<<endl;
    cout<<"    Perimeter="<<rect1.Perimeter()<<endl;
    cout<<"    Area="<<rect1.Area()<<endl;
    double w,h;
    cin>>w>>h;
    Rectangle rect2(w,h);
    cout<<"Show object rect2:"<<endl;
    cout<<"    width="<<rect2.GetWidth()<<endl;
    cout<<"    height="<<rect2.GetHeight()<<endl;
    cout<<"    Perimeter="<<rect2.Perimeter()<<endl;
    cout<<"    Area="<<rect2.Area()<<endl;
    cin>>w>>h;
    cout<<"Reset and Show object rect1:"<<endl;
    rect1.Set(w,h);
    cout<<"    width="<<rect1.GetWidth()<<endl;
    cout<<"    height="<<rect1.GetHeight()<<endl;
    cout<<"    Perimeter="<<rect1.Perimeter()<<endl;
    cout<<"    Area="<<rect1.Area()<<endl;
    return 0;
}
```

### c++.1005 复数类 Complex 的设计

### 这道题个人认为测试数据有问题！下面给出两段代码，第一段是能够 ac 这题的代码（不过其实是错误的，当虚部为 1 或者-1 时，会表现出 1i 或者-1i。）。第二段代码则是我认为的正解！（估计是测试数据出错了

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Complex
{
public:
    Complex()
    {
        real = 1;
        imag = 2;
    }
    Complex(double r, double i)
    {
        real = r;
        imag = i;
    }
    double real, imag;
    void Show()
    {
        if (real == 0 && imag != 0) cout << imag << "i" << endl;
        else if (imag == 0) cout << real << endl;
        else
        {
            if (imag > 0) cout << real << "+" << imag << "i" << endl;
            else cout << real << imag << "i" << endl;
        }
    }
    void Set(double r, double i)
    {
        real = r;
        imag = i;
    }
};

int main()
{
    Complex c1;
    cout<<"Show object c1:";
    c1.Show();
    double real,imag;
    cin>>real>>imag;
    Complex c2(real,imag);
    cout<<"Show object c2:";
    c2.Show();
    cin>>real>>imag;
    cout<<"Reset and Show object c1:";
    c1.Set(real,imag);
    c1.Show();
    return 0;
}
```

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Complex
{
public:
    Complex()
    {
        real = 1;
        imag = 2;
    }
    Complex(double r, double i)
    {
        real = r;
        imag = i;
    }
    double real, imag;
    void Show()
    {
        if (imag == 0) cout << real << endl;
        else if (real == 0 && imag == 1) cout << "i" << endl;
        else if (real == 0 && imag == -1) cout << "-i" << endl;
        else if (real == 0) cout << imag << "i" << endl;
        else if (imag == 1) cout << real << "+i" << endl;
        else if (imag == -1) cout << real << "-i" << endl;
        else
        {
            if (imag > 0) cout << real << "+" << imag << "i" << endl;
            else cout << real << imag << "i" << endl;
        }
    }
    void Set(double r, double i)
    {
        real = r;
        imag = i;
    }
};

int main()
{
    Complex c1;
    cout<<"Show object c1:";
    c1.Show();
    double real,imag;
    cin>>real>>imag;
    Complex c2(real,imag);
    cout<<"Show object c2:";
    c2.Show();
    cin>>real>>imag;
    cout<<"Reset and Show object c1:";
    c1.Set(real,imag);
    c1.Show();
    return 0;
}
```

### c++.1006 日期类 Date 的设计

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Date
{
public:
    Date()
    {
        year = 2015;
        month = 5;
        day = 20;
    }
    Date(int y, int m, int d)
    {
        year = y;
        month = m;
        day = d;
    }
    int year, month, day;
    void Show()
    {
        cout << year << "-" << month << "-" << day << endl;
    }
    void Set(int y, int m, int d)
    {
        year = y;
        month = m;
        day = d;
    }
    void Set()
    {
        year = 2050;
        month = 12;
        day = 1;
    }
    int GetYear()
    {
        return year;
    }
    int GetMonth()
    {
        return month;
    }
    int GetDay()
    {
        return day;
    }
};

int main()
{
    Date d1;
    cout<<"Show object d1:";
    cout<<d1.GetYear()<<"-"<<d1.GetMonth()<<"-"<<d1.GetDay()<<endl;
    int y,m,d;
    cin>>y>>m>>d;
    Date d2(y,m,d);
    cout<<"Show object d2:";
    cout<<d2.GetYear()<<"-"<<d2.GetMonth()<<"-"<<d2.GetDay()<<endl;
    cin>>y>>m>>d;
    cout<<"Reset and Show object d1:";
    d1.Set(y,m,d);
    d1.Show();
    cout<<"Reset and Show object d2:";
    d2.Set();
    d2.Show();
    return 0;
}
```

### c++.1007 学生类 Student 的设计

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class Student
{
public:
    Student()
    {
        id = 10000;
        name = "NULL";
        score = 0;
    }
    Student(int i, string n, int s)
    {
        id = i;
        name = n;
        score = s;
    }
    int id;
    string name;
    int score;
    int GetId()
    {
        return id;
    }
    string GetName()
    {
        return name;
    }
    int GetScore()
    {
        return score;
    }
    void Set(int i, string n, int s)
    {
        id = i;
        name = n;
        score = s;
    }
    void Set()
    {
        id = 99999;
        name = "NONAME";
        score = 100;
    }
    void Show()
    {
        cout << id << "-" << name << "-" << score << endl;
    }
};

int main()
{
    Student stu1;
    cout<<"Show object stu1:";
    cout<<stu1.GetId()<<"-"<<stu1.GetName()<<"-"<<stu1.GetScore()<<endl;
    int no,s;
    char xm[9];
    cin>>no>>xm>>s;
    Student stu2(no,xm,s);
    cout<<"Show object stu2:";
    cout<<stu2.GetId()<<"-"<<stu2.GetName()<<"-"<<stu2.GetScore()<<endl;
    cin>>no>>xm>>s;
    cout<<"Reset and Show object stu1:";
    stu1.Set(no,xm,s);
    stu1.Show();
    cout<<"Reset and Show object stu2:";
    stu2.Set();
    stu2.Show();
    return 0;
}
```

### c++.1008 线段类 Line 的设计

```c++
#include<iostream>
#include<cmath>
using namespace std;

//你提交的代码在这里
class Line
{
public:
    Line()
    {
        sx = 0, sy = 0;
        ex = 0, ey = 0;
    }
    Line(double sxx, double syy, double exx, double eyy)
    {
        sx = sxx, sy = syy;
        ex = exx, ey = eyy;
    }
    double sx, sy, ex, ey;
    void Show()
    {
        double len = sqrt((sx - ex) * (sx - ex) + (sy - ey) * (sy - ey));
        cout << "(" << sx << "," << sy << ")--(" << ex << "," << ey << ")length=" << len << endl;
    }
    void Set(double sxx, double syy, double exx, double eyy)
    {
        sx = sxx, sy = syy;
        ex = exx, ey = eyy;
    }
    void Set()
    {
        sx = 1, sy = 5;
        ex = 8, ey = 4;
    }
};

int main()
{
    Line L1;
    cout<<"Show object L1:";
    L1.Show();
    double x1,y1,x2,y2;
    cin>>x1>>y1>>x2>>y2;
    Line L2(x1,y1,x2,y2);
    cout<<"Show object L2:";
    L2.Show();
    cin>>x1>>y1>>x2>>y2;
    cout<<"Reset and Show object L1:";
    L1.Set(x1,y1,x2,y2);
    L1.Show();
    cout<<"Reset and Show object L2:";
    L2.Set();
    L2.Show();
    return 0;
}
```

### c++.1009 国家类 Country 的设计

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class Country
{
public:
    Country()
    {
        name = "NULL";
        capital = "NONE";
        num = 0;
    }
    Country(string n, string c, int nu)
    {
        name = n;
        capital = c;
        num = nu;
    }
    string name, capital;
    int num;
    string GetCapital()
    {
        return capital;
    }
    string GetName()
    {
        return name;
    }
    int GetPopulation()
    {
        return num;
    }
    void Set(string n, string c, int nu)
    {
        name = n;
        capital = c;
        num = nu;
    }
    void Set()
    {
        name = "China";
        capital = "Beijing";
        num = 1400000000;
    }
    void Show()
    {
        cout << name << "-" << capital << "-" << num << endl;
    }
};

int main()
{
    Country c1;
    cout<<"Show object c1:";
    cout<<c1.GetName()<<"-"<<c1.GetCapital()<<"-"<<c1.GetPopulation()<<endl;
    char name[40],capital[40];
    int population;
    cin>>name>>capital>>population;
    Country c2(name,capital,population);
    cout<<"Show object c2:";
    cout<<c2.GetName()<<"-"<<c2.GetCapital()<<"-"<<c2.GetPopulation()<<endl;
    cin>>name>>capital>>population;
    cout<<"Reset and Show object c1:";
    c1.Set(name,capital,population);
    c1.Show();
    cout<<"Reset and Show object c2:";
    c2.Set();
    c2.Show();
    return 0;
}
```

### c++.1010 长期存款类 Fixed_Deposit 的设计

```c++
#include<iostream>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Fixed_Deposit
{
public:
    Fixed_Deposit()
    {
        amount = 10000.00;
        rate = 0.0330;
        year = 1;
    }
    Fixed_Deposit(double a, double r, int y)
    {
        amount = a;
        rate = r;
        year = y;
    }
    double amount, rate;
    int year;
    void Show()
    {
        double total = amount * rate * year + amount;
        cout << "amount=" << amount << "  rate=" << rate * 100 << "%  years=" << year << "  total=" << total << endl;
    }
    void Set(double a, double r, int y)
    {
        amount = a;
        rate = r;
        year = y;
    }
    double GetAmount()
    {
        return amount;
    }
    double GetRate()
    {
        return rate;
    }
    int GetYears()
    {
        return year;
    }
    double GetAll()
    {
        double total = amount * rate * year + amount;
        return total;
    }
};

int main()
{
    cout<<fixed<<setprecision(2);
    Fixed_Deposit f1;
    cout<<"Show object f1:"<<endl;
    cout<<"amount="<<f1.GetAmount();        //输出存款本金
    cout<<"  rate="<<f1.GetRate()*100<<"%"; //输出存款利率
    cout<<"  years="<<f1.GetYears();        //输出存款年数
    cout<<"  total="<<f1.GetAll()<<endl;    //输出到期本息合计
    double amount,rate;
    int years;
    cin>>amount>>rate>>years;
    Fixed_Deposit f2(amount,rate,years);
    cout<<"Show object f2:"<<endl;
    cout<<"amount="<<f2.GetAmount();        //输出存款本金
    cout<<"  rate="<<f2.GetRate()*100<<"%"; //输出存款利率
    cout<<"  years="<<f2.GetYears();        //输出存款年数
    cout<<"  total="<<f2.GetAll()<<endl;    //输出到期本息合计
    cin>>amount>>rate>>years;
    cout<<"Reset and Show object f1:"<<endl;
    f1.Set(amount,rate,years);
    f1.Show();
    return 0;
}
```

### c++.1011 书类 Book 的设计

```c++
#include<iostream>
#include<cstring>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Book
{
public:
    Book()
    {
        author = "NONE";
        title = "NULL";
        price = 0.00;
    }
    Book(string a, string t, double p)
    {
        author = t;
        title = a;
        price = p;
    }
    string author;
    string title;
    double price;
    void Set(string a, string t, double p)
    {
        author = t;
        title = a;
        price = p;
    }
    void Show()
    {
        cout << title << "，" << author << "，" << price << endl;
    }
    void Set()
    {
        author = "同济大学数学系";
        title = "高等数学(第七版)上册";
        price = 37.70;
    }
    string GetAuthor()
    {
        return author;
    }
    string GetTitle()
    {
        return title;
    }
    double GetPrice()
    {
        return price;
    }
};

int main()
{
    cout<<fixed<<setprecision(2);
    Book b1;
    cout<<"Show object b1:";
    cout<<b1.GetTitle()<<"，"<<b1.GetAuthor()<<"，"<<b1.GetPrice()<<endl;
    char title[40],author[40];
    double price;
    cin>>title>>author>>price;
    Book b2(title,author,price);
    cout<<"Show object b2:";
    cout<<b2.GetTitle()<<"，"<<b2.GetAuthor()<<"，"<<b2.GetPrice()<<endl;
    cin>>title>>author>>price;
    cout<<"Reset and Show object b1:";
    b1.Set(title,author,price);
    b1.Show();
    cout<<"Reset and Show object b2:";
    b2.Set();
    b2.Show();
    return 0;
}
```

### c++.1012 建筑物类 building 的设计

```c++
#include<iostream>
#include<cstring>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Building
{
public:
    Building()
    {
        name = "NULL";
        height = 0.00;
        floors = 0;
    }
    Building(string n, double h, int f)
    {
        name = n;
        height = h;
        floors = f;
    }
    string name;
    int floors;
    double height;
    void Set(string n, double h, int f)
    {
        name = n;
        height = h;
        floors = f;
    }
    void Set()
    {
        name = "None";
        height = 20.00;
        floors = 7;
    }
    void Show()
    {
        //cout << fixed<< setprecision(2);
        cout << name << "--" << height << "米--" << floors << "层" << endl;
    }
    string GetName()
    {
        return name;
    }
    double GetHeight()
    {
        return height;
    }
    int GetFloors()
    {
        return floors;
    }
};

int main()
{
    cout<<fixed<<setprecision(2);
    Building b1;
    cout<<"Show object b1:";
    cout<<b1.GetName()<<"--"<<b1.GetHeight()<<"米--"<<b1.GetFloors()<<"层"<<endl;
    char name[40];
    double height;
    int floors;
    cin>>name>>height>>floors;
    Building b2(name,height,floors);
    cout<<"Show object b2:";
    cout<<b2.GetName()<<"--"<<b2.GetHeight()<<"米--"<<b2.GetFloors()<<"层"<<endl;
    cin>>name>>height>>floors;
    cout<<"Reset and Show object b1:";
    b1.Set(name,height,floors);
    b1.Show();
    cout<<"Reset and Show object b2:";
    b2.Set();
    b2.Show();
    return 0;
}
```

### c++.1013 课程类 Course 的设计

### 本题的提供代码中，id 的数据类型是 double，这里题目笔误，id 的数据类型应该是 int（自行修改。

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class Course
{
public:
    Course()
    {
        id = 0;
        name = "NULL";
        credit = 0;
    }
    Course(int i, string n, int c)
    {
        id = i;
        name = n;
        credit = c;
    }
    int id;
    string name;
    int credit;
    void Show()
    {
        cout << id << "/" << name << "/" << credit << endl;
    }
    void Set(int i, string n, int c)
    {
        id = i;
        name = n;
        credit = c;
    }
    void Set()
    {
        id = 9999999;
        name = "None";
        credit = 10000;
    }
    int GetId()
    {
        return id;
    }
    string GetName()
    {
        return name;
    }
    int GetCredit()
    {
        return credit;
    }
};

int main()
{
    Course c1;
    cout<<"Show object c1:";
    cout<<c1.GetId()<<"/"<<c1.GetName()<<"/"<<c1.GetCredit()<<endl;
    double id;
    char name[40];
    int credit;
    cin>>id>>name>>credit;
    Course c2(id,name,credit);
    cout<<"Show object c2:";
    cout<<c2.GetId()<<"/"<<c2.GetName()<<"/"<<c2.GetCredit()<<endl;
    cin>>id>>name>>credit;
    cout<<"Reset and Show object c1:";
    c1.Set(id,name,credit);
    c1.Show();
    cout<<"Reset and Show object c2:";
    c2.Set();
    c2.Show();
    return 0;
}
```

### c++.1014 实验室类 Laboratory 的设计

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class Laboratory
{
public:
    Laboratory(int r, int n, string s)
    {
        room_num = r;
        num = n;
        name = s;
    }
    Laboratory()
    {
        room_num = 0;
        num = 0;
        name = "NULL";
    }
    int room_num;
    int num;
    string name;
    void Set(int r, int n, string s)
    {
        room_num = r;
        num = n;
        name = s;
    }
    void Set()
    {
        room_num = 99999;
        num = 1000;
        name = "None";
    }
    void Show()
    {
        cout << room_num << "/" << num << "/" << name << endl;
    }
    int GetRoom_no()
    {
        return room_num;
    }
    int GetCapacity()
    {
        return num;
    }
    string GetName()
    {
        return name;
    }
};

int main()
{
    Laboratory L1;
    cout<<"Show object L1:";
    cout<<L1.GetRoom_no()<<"/"<<L1.GetCapacity()<<"/"<<L1.GetName()<<endl;
    int room_no;
    int capacity;
    char name[20];
    cin>>room_no>>capacity>>name;
    Laboratory L2(room_no,capacity,name);
    cout<<"Show object L2:";
    cout<<L2.GetRoom_no()<<"/"<<L2.GetCapacity()<<"/"<<L2.GetName()<<endl;
    cin>>room_no>>capacity>>name;
    cout<<"Reset and Show object L1:";
    L1.Set(room_no,capacity,name);
    L1.Show();
    cout<<"Reset and Show object L2:";
    L2.Set();
    L2.Show();
    return 0;
}

```

### c++.1015 个人 Person 类的设计

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class Person
{
public:
    Person(string n, string s, int a)
    {
        name = n;
        sex = s;
        age = a;
    }
    Person()
    {
        name = "NULL";
        sex = "NO";
        age = 0;
    }
    string name;
    string sex;
    int age;
    void Set(string n, string s, int a)
    {
        name = n;
        sex = s;
        age = a;
    }
    void Set()
    {
        name = "Unknown";
        sex = "FM";
        age = 1000;
    }
    void Show()
    {
        cout << name << "," << sex << "," << age << endl;
    }
    string GetName()
    {
        return name;
    }
    string GetSex()
    {
        return sex;
    }
    int GetAge()
    {
        return age;
    }
};

int main()
{
    Person p1;
    cout<<"Show object p1:";
    cout<<p1.GetName()<<","<<p1.GetSex()<<","<<p1.GetAge()<<endl;
    char name[20],sex[10];
    int age;
    cin>>name>>sex>>age;
    Person p2(name,sex,age);
    cout<<"Show object p2:";
    cout<<p2.GetName()<<","<<p2.GetSex()<<","<<p2.GetAge()<<endl;
    cin>>name>>sex>>age;
    cout<<"Reset and Show object p1:";
    p1.Set(name,sex,age);
    p1.Show();
    cout<<"Reset and Show object p2:";
    p2.Set();
    p2.Show();
    return 0;
}
```

## 2.运算符重载

### c++.2001 时间类运算符重载

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Time
{
public:
    Time()
    {
        hour = 1;
        minute = 2;
        second = 3;
    }
    Time(int h, int m, int s)
    {
        hour = h;
        minute = m;
        second = s;
      	normalize();
    }
    int hour, minute, second;
    void Set(int hh, int mm, int ss)
    {
        hour = hh;
        minute = mm;
        second = ss;
        normalize();
    }
    void normalize()
    {
        minute += second / 60;
        second %= 60;
        if (second < 0)
        {
            second += 60;
            minute--;
        }
        hour += minute / 60;
        minute %= 60;
        if (minute < 0)
        {
            minute += 60;
            hour--;
        }
        while (hour < 0)
        {
            hour += 24;
        }
        hour %= 24;
    }
};
ostream& operator<< (ostream& cout, Time& t)
{
    cout << t.hour << ":" << t.minute << ":" << t.second;
    return cout;
}
long long operator- (Time& t1, Time& t2)
{
    long long s1 = t1.hour * 3600 + t1.minute * 60 + t1.second;
    long long s2 = t2.hour * 3600 + t2.minute * 60 + t2.second;
    return (s1 - s2);
}
Time operator+ (Time& t1, int s)
{
    Time t2 = t1;
    t2.second += s;
    t2.normalize();
    return t2;
}
Time operator- (Time& t1, int s)
{
    return t1 + (-s);
}

int main()
{
    Time t1;
    cout<<"Show object t1:"<<t1<<endl;
    int hour,minute,second;
    cin>>hour>>minute>>second;
    Time t2(hour,minute,second);
    cout<<"Show object t2:"<<t2<<endl;
    cin>>hour>>minute>>second;
    t1.Set(hour,minute,second);
    cout<<"Reset and Show object t1:"<<t1<<endl;
    int n;
    n=t2-t1;
    cout<<t2<<"-"<<t1<<"="<<n<<"s"<<endl;
    cin>>n;
    cout<<t1<<"+"<<n<<"s=";
    t2=t1+n;
    cout<<t2<<endl;
    cout<<t1<<"-"<<n<<"s=";
    t1=t1-n;
    cout<<t1<<endl;
    return 0;
}
```

### c++.2002 日期类运算符重载

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Date
{
public:
    Date()
    {
        year = 2023;
        month = 5;
        day = 20;
    }
    Date(int y, int m, int d)
    {
        year = y;
        month = m;
        day = d;
        normalize();
    }
    int year, month, day;
    int mp[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int mr[13] = {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    bool isr(int y)
    {
        return (y % 400 == 0) || (y % 100 != 0 && y % 4 == 0);
    }
    long long tianshu()
    {
        long long num = 0;
        for (int y = 1; y < year; y++)
        {
            num += isr(y) ? 366 : 365;
        }
        for (int m = 1; m < month; m++)
        {
            if (isr(year)) num += mr[m];
            else num += mp[m];
        }
        num += day;
        return num;
    }
    void normalize()
    {
        while (day > (isr(year) ? mr[month] : mp[month]))
        {
            day -= (isr(year) ? mr[month] : mp[month]);
            month++;
            if (month > 12)
            {
                month = 1;
                year++;
            }
        }
        while (day < 1)
        {
            month--;
            if (month < 1)
            {
                month = 12;
                year--;
            }
            day += (isr(year) ? mr[month] : mp[month]);
        }
    }
    void Set(int y, int m, int d)
    {
        year = y;
        month = m;
        day = d;
        normalize();
    }
    long long operator- (Date& d)
    {
        return tianshu() - d.tianshu();
    }
    Date operator+ (int n)
    {
        Date tmp = *this;
        tmp.day += n;
        tmp.normalize();
        return tmp;
    }
    Date operator- (int n)
    {
        return *this + (-n);
    }
};
ostream& operator<< (ostream& cout, Date& d)
{
    cout << d.year << "/" << d.month << "/" << d.day;
    return cout;
}

int main()
{
    Date d1;
    cout<<"Show object d1:"<<d1<<endl;
    int year,month,day;
    cin>>year>>month>>day;
    Date d2(year,month,day);
    cout<<"Show object d2:"<<d2<<endl;
    cin>>year>>month>>day;
    d1.Set(year,month,day);
    cout<<"Reset and Show object d1:"<<d1<<endl;
    int n;
    n=d2-d1;
    cout<<d2<<" - "<<d1<<" = "<<n<<endl;
    cin>>n;
    cout<<d1<<" + "<<n<<" = ";
    d2=d1+n;
    cout<<d2<<endl;
    cout<<d1<<" - "<<n<<" = ";
    d1=d1-n;
    cout<<d1<<endl;
    return 0;
}
```

### c++.2003 复数类运算符重载

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Complex
{
public:
    Complex()
    {
        real = 0;
        imag = 0;
    }
    Complex(double r, double i)
    {
        real = r;
        imag = i;
    }
    double real, imag;
    void Set(double r, double i)
    {
        real = r;
        imag = i;
    }
    Complex operator+ (Complex c)
    {
        Complex tmp = *this;
        tmp.real += c.real;
        tmp.imag += c.imag;
        return tmp;
    }
    Complex operator- (Complex c)
    {
        Complex tmp = *this;
        tmp.real -= c.real;
        tmp.imag -= c.imag;
        return tmp;
    }
    Complex operator* (Complex c)
    {
        Complex tmp;
        tmp.real = this->real * c.real - this->imag * c.imag;
        tmp.imag = this->real * c.imag + this->imag * c.real;
        return tmp;
    }
};
ostream& operator<< (ostream& cout, Complex& c)
{
    if (c.imag == 0) cout << c.real;
    else if (c.real == 0 && c.imag == 1) cout << "i";
    else if (c.real == 0 && c.imag == -1) cout << "-i";
    else if (c.real == 0) cout << c.imag << "i";
    else if (c.imag == 1) cout << c.real << "+i";
    else if (c.imag == -1) cout << c.real << "-i";
    else
    {
        if (c.imag > 0) cout << c.real << "+" << c.imag << "i";
        else cout << c.real << c.imag << "i";
    }
    return cout;
}

int main()
{
    Complex c1;
    cout<<"Show object c1:"<<c1<<endl;
    double re,im;
    cin>>re>>im;
    Complex c2(re,im);
    cout<<"Show object c2:"<<c2<<endl;
    cin>>re>>im;
    c1.Set(re,im);
    cout<<"Reset and Show object c1:"<<c1<<endl;
    Complex c3;
    c3=c1+c2;
    cout<<c1<<" + "<<c2<<" = "<<c3<<endl;
    c3=c1-c2;
    cout<<c1<<" - "<<c2<<" = "<<c3<<endl;
    c3=c1*c2;
    cout<<c1<<" * "<<c2<<" = "<<c3<<endl;
    return 0;
}
```

### c++.2004 学生类运算符重载

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class Student
{
public:
    int id;
    string name;
    int score;
    bool operator> (Student s)
    {
        if (this->score == s.score) return this->id > s.id;
        else return this->score > s.score;
    }
};
istream& operator>> (istream& cin, Student& s)
{
    cin >> s.id >> s.name >> s.score;
    return cin;
}
ostream& operator<< (ostream& cout, Student& s)
{
    cout << "id=" << s.id << ",name=" << s.name << ",score=" << s.score;
    return cout;
}

int main()
{
    int i,j,n;
    Student t;
    cin>>n;
    Student *stu=new Student[n];
    for(i=0;i<n;i++)
        cin>>stu[i];
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(stu[j]>stu[j+1])
            {  t=stu[j];  stu[j]=stu[j+1];   stu[j+1]=t;    }
    for(i=0;i<n;i++)
        cout<<i+1<<":"<<stu[i]<<endl;
    delete[]stu;
    return 0;
}
```

### c++.2005 短整数类运算符重载

### 本题在定义除法运算符号时，题目没有说明当 除数 为 0 时，应该返回什么来表明无意义计算。但这是应该注意的事情！

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class SmallInt
{
public:
    int val;
    void normalize()
    {
        while (val > 127) val -= 256;
        while (val < -128) val += 256;
    }
    SmallInt operator+ (SmallInt s)
    {
        SmallInt tmp = *this;
        tmp.val += s.val;
        tmp.normalize();
        return tmp;
    }
    SmallInt operator- (SmallInt s)
    {
        SmallInt tmp = *this;
        tmp.val -= s.val;
        tmp.normalize();
        return tmp;
    }
    SmallInt operator* (SmallInt s)
    {
        SmallInt tmp = *this;
        tmp.val *= s.val;
        tmp.normalize();
        return tmp;
    }
    SmallInt operator/ (SmallInt s)
    {
        if (s.val == 0) cout << "题目不严谨。。。";
        SmallInt tmp = *this;
        tmp.val /= s.val;
        tmp.normalize();
        return tmp;
    }
};
istream& operator>> (istream& cin, SmallInt& s)
{
    cin >> s.val;
    s.normalize();
    return cin;
}
ostream& operator<< (ostream& cout, SmallInt& s)
{
    cout << s.val;
    return cout;
}

int main()
{
    SmallInt s1,s2,s3;
    cin>>s1>>s2;
    s3=s1+s2;
    cout<<s1<<" + "<<s2<<" = "<<s3<<endl;
    s3=s1-s2;
    cout<<s1<<" - "<<s2<<" = "<<s3<<endl;
    s3=s1*s2;
    cout<<s1<<" * "<<s2<<" = "<<s3<<endl;
    s3=s1/s2;
    cout<<s1<<" / "<<s2<<" = "<<s3<<endl;
    return 0;
}
```

### c++.2006 个人 Person 类运算符重载

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class Person
{
public:
    string name = "NULL";
    int age = 0;
    double GetAge()
    {
        return (double)age;
    }
    Person operator+ (Person p)
    {
        Person tmp = *this;
        tmp.age += p.age;
        return tmp;
    }
};
istream& operator>> (istream& cin, Person& s)
{
    cin >> s.name >> s.age;
    return cin;
}
ostream& operator<< (ostream& cout, Person& s)
{
    cout << "name=" << s.name << ",age=" << s.age;
    return cout;
}

int main()
{
    int n,i;
    cin>>n;
    Person *person=new Person[n+1];
    for(i=1;i<=n;i++)
        cin>>person[i];
    for(i=0;i<=n;i++)
        cout<<person[i]<<endl;
    for(i=1;i<=n;i++)
        person[0]=person[0]+person[i];
    cout<<"average age:"<<person[0].GetAge()/(double)n<<endl;
    delete[] person;
    return 0;
}

```

### c++.2007 圆类运算符重载

```c++
#include<iostream>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Circle
{
public:
    Circle()
    {
        radius = 0.00000;
        area = 0.00000;
    }
    double radius;
    double area;
    double GetArea()
    {
        return area;
    }
    Circle operator+ (Circle c)
    {
        Circle tmp = *this;
        tmp.area += 3.14159 * c.radius * c.radius;
        return tmp;
    }
};
istream& operator>> (istream& cin, Circle& s)
{
    cin >> s.radius;
    return cin;
}
ostream& operator<< (ostream& cout, Circle& s)
{
    cout << "radius=" << s.radius << ",area=" << 3.14159 * s.radius * s.radius;
    return cout;
}

int main()
{
    cout<<fixed<<showpoint<<setprecision(5);
    int n,i;
    cin>>n;
    Circle *c=new Circle[n+1];
    for(i=1;i<=n;i++)
        cin>>c[i];
    for(i=0;i<=n;i++)
        cout<<i<<":"<<c[i]<<endl;
    for(i=1;i<=n;i++)
        c[0]=c[0]+c[i];
    cout<<"total area="<<c[0].GetArea()<<endl;
    delete[] c;
    return 0;
}
```

### c++.2008 分数类运算符重载

### 注意！本题下方有提示 “分数的输出要求。。。最简形式” 这里即使分子为 0 时，输出仍然不可省略分母部分。。。即使分子等于分母，或者分子分母互为相反数，也只能输出 1/1 或者 -1/1，而不能输出 1 或者 -1。

这题被防了很久。。。我很无语

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Fraction {
public:
    int znum;
    int mnum;
    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
    void yue() {
        if (mnum < 0) {
            znum *= -1;
            mnum *= -1;
        }
        int g = gcd(abs(znum), abs(mnum));
        znum /= g;
        mnum /= g;
        return;
    }
    Fraction operator+ (Fraction f) {
        Fraction tmp;
        tmp.mnum = this->mnum * f.mnum;
        tmp.znum = this->znum * f.mnum + this->mnum * f.znum;
        tmp.yue();
        return tmp;
    }
    Fraction operator- (Fraction f) {
        Fraction tmp;
        tmp.mnum = this->mnum * f.mnum;
        tmp.znum = this->znum * f.mnum - this->mnum * f.znum;
        tmp.yue();
        return tmp;
    }
    Fraction operator* (Fraction f) {
        Fraction tmp = *this;
        tmp.znum *= f.znum;
        tmp.mnum *= f.mnum;
        tmp.yue();
        return tmp;
    }
    Fraction operator/ (Fraction f) {
        Fraction tmp = *this;
        tmp.znum *= f.mnum;
        tmp.mnum *= f.znum;
        tmp.yue();
        return tmp;
    }
};
istream& operator>> (istream& cin, Fraction& s) {
    cin >> s.znum >> s.mnum;
    s.yue();
    return cin;
}
ostream& operator<< (ostream& cout, Fraction& s) {
    cout << s.znum << "/" << s.mnum;
    return cout;
}

int main()
{
    Fraction f1,f2,f3;
    cin>>f1>>f2;
    f3=f1+f2;
    cout<<f1<<" + "<<f2<<" = "<<f3<<endl;
    f3=f1-f2;
    cout<<f1<<" - "<<f2<<" = "<<f3<<endl;
    f3=f1*f2;
    cout<<f1<<" * "<<f2<<" = "<<f3<<endl;
    f3=f1/f2;
    cout<<f1<<" / "<<f2<<" = "<<f3<<endl;
    return 0;
}
```

### c++,2009 整型动态数组类及运算符重载

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class ARRAY {
private:
    int* p;
    int len;

public:
    friend ostream& operator<< (ostream& cout, ARRAY& s);
    friend istream& operator>> (istream& cin, ARRAY& s);
    ARRAY (int n) {
        len = n;
        p = new int[n];
        for (int i = 0; i < n; i++) {
            p[i] = 0;
        }
    }
    ~ARRAY () {
        delete[] p;
    }
    int& operator[] (int i) {
        return p[i];
    }
    int* operator+ (int i) {
        return p + i;
    }
};
ostream& operator<< (ostream& cout, ARRAY& s) {
    cout << "length=" << s.len << ",element={";
    for (int i = 0; i < s.len; i++) {
        cout << s[i];
        if (i != s.len - 1) {
            cout << ",";
        }
    }
    cout << "}";
    return cout;
}

int main()
{
    int n,i,j,t;
    cin>>n;
    ARRAY a(n);
    cout<<"Initial:"<<a<<endl;
    for(i=0;i<n;i++)
        cin>>a[i];
    cout<<"Before sort:"<<a<<endl;
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(a[j]>a[j+1])
            {  t=*(a+j);   *(a+j)=*(a+j+1);  *(a+j+1)=t;   }
    cout<<"After sort:"<<a<<endl;
    return 0;
}
```

### c++.2010 分数类运算符重载（2）

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Fraction {
public:
    int znum;
    int mnum;
    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
    void yue() {
        if (znum == 0) {
            mnum = 1;
            return;
        }
        if (mnum < 0) {
            znum *= -1;
            mnum *= -1;
        }
        int g = gcd(abs(znum), abs(mnum));
        znum /= g;
        mnum /= g;
        return;
    }
    bool operator> (Fraction f) {
        return (znum * f.mnum > mnum * f.znum);
    }
};
istream& operator>> (istream& cin, Fraction& s) {
    cin >> s.znum >> s.mnum;
    s.yue();
    return cin;
}
ostream& operator<< (ostream& cout, Fraction& s) {
    cout << s.znum << "/" << s.mnum;
    return cout;
}

int main()
{
    int i,j,n;
    Fraction t;
    cin>>n;
    Fraction *f=new Fraction[n];
    for(i=0;i<n;i++)
        cin>>f[i];
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(f[j]>f[j+1])
            {   t=f[j];    f[j]=f[j+1];   f[j+1]=t;  }
    cout<<f[0];
    for(i=1;i<n;i++)  cout<<","<<f[i];
    cout<<endl;
    delete[]f;
    return 0;
}
```

### c++.2011 圆类 运算符重载（2）

```c++
#include<iostream>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Circle {
public:
    double radius;
    Circle& operator= (double r) {
        radius = r;
        return *this;
    }
    bool operator> (Circle a) {
        return radius > a.radius;
    }
};
ostream& operator<< (ostream& cout, Circle& s) {
    cout << "radius=" << s.radius << ",area=" << 3.14159 * s.radius * s.radius;
    return cout;
}

int main()
{
    int n,i,j;
    double k;
    Circle t;
    cout<<fixed<<showpoint<<setprecision(5);
    cin>>n;
    Circle *c=new Circle[n];
    for(i=0;i<n;i++)
    {
        cin>>k;
        c[i]=k;
    }
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(c[j]>c[j+1])
            {   t=c[j];    c[j]=c[j+1];     c[j+1]=t;   }
    for(i=0;i<n;i++)
        cout<<i+1<<":"<<c[i]<<endl;
    delete[] c;
    return 0;
}
```

### c++.2012 矩形类运算符重载

```c++
#include<iostream>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Rectangle {
public:
    double width, height;
    bool operator> (Rectangle& a) {
        return (width * height > a.height * a.width);
    }
};
istream& operator>> (istream& cin, Rectangle& a) {
    cin >> a.width >> a.height;
    return cin;
}
ostream& operator<< (ostream& cout, Rectangle& a) {
    cout << "width=" << a.width << " height=" << a.height << " area=" << a.width * a.height;
    return cout;
}

int main()
{
    int n,i,j;
    Rectangle t;
    cout<<fixed<<showpoint<<setprecision(2);
    cin>>n;
    Rectangle *r=new Rectangle[n];
    for(i=0;i<n;i++)
        cin>>r[i];
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(r[j]>r[j+1])
            { t=r[j];   r[j]=r[j+1];    r[j+1]=t;   }
    for(i=0;i<n;i++)
        cout<<i+1<<":"<<r[i]<<endl;
    delete[] r;
    return 0;
}
```

### c++.2013 日期类运算符重载（2）

这里的题干。。。。。。。。。

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Date {
public:
    int year, month, day;
    int mp[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int mr[13] = {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    bool isr(int y) {
        return (y % 400 == 0) || (y % 100 != 0 && y % 4 == 0);
    }
    void normalize() {
        while (day > (isr(year) ? mr[month] : mp[month])) {
            day -= (isr(year) ? mr[month] : mp[month]);
            month++;
            if (month > 12) {
                month = 1;
                year++;
            }
        }
        while (day < 1) {
            month--;
            if (month < 1) {
                month = 12;
                year--;
            }
            day += (isr(year) ? mr[month] : mp[month]);
        }
    }
    bool operator> (Date d) {
        if (year != d.year) {
            return year > d.year;
        }
        if (month != d.month) {
            return month > d.month;
        }
        return day > d.day;
    }
};
istream& operator>> (istream& cin, Date& d) {
    cin >> d.year >> d.month >> d.day;
    d.normalize();
    return cin;
}
ostream& operator<< (ostream& cout, Date& d)
{
    cout << d.year << "/" << d.month << "/" << d.day;
    return cout;
}

int main()
{
    int n,i,j;
    Date t;
    cin>>n;
    Date *c=new Date[n];
    for(i=0;i<n;i++)
        cin>>c[i];
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(c[j]>c[j+1])
            {  t=c[j];  c[j]=c[j+1];    c[j+1]=t;    }
    for(i=0;i<n;i++)
        cout<<i+1<<":"<<c[i]<<endl;
    delete[] c;
    return 0;
}
```

### c++.2014 时间类运算符重载（2）

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Time {
public:
    int hour;
    int minute;
    int second;
    void normalize() {
        minute += second / 60;
        second %= 60;
        if (second < 0) {
            second += 60;
            minute--;
        }
        hour += minute / 60;
        minute %= 60;
        if (minute < 0) {
            minute += 60;
            hour--;
        }
        while (hour < 0){
            hour += 24;
        }
        hour %= 24;
    }
    bool operator> (Time t) {
        if (hour != t.hour) {
            return hour > t.hour;
        }
        if (minute != t.minute) {
            return minute > t.minute;
        }
        return second > t.second;
    }
    Time& operator= (int x) {
        hour = x / 3600;
        x %= 3600;
        minute = x / 60;
        second = x % 60;
        normalize();
        return *this;
    }
};
ostream& operator<< (ostream& cout, Time& d) {
    cout << d.hour << ":" << d.minute << ":" << d.second;
    return cout;
}

int main()
{
    int n,i,j;
    Time t;
    cin>>n;
    Time *c=new Time[n];
    for(i=0;i<n;i++)
    {
        cin>>j;
        c[i]=j;
    }
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(c[j]>c[j+1])
            {   t=c[j];   c[j]=c[j+1];   c[j+1]=t;  }
    for(i=0;i<n;i++)
        cout<<"("<<i+1<<")"<<c[i]<<endl;
    delete[] c;
    return 0;
}
```

### c++.2015 字符串 string 运算符重载

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class CSTRING {
private:
    char* p = nullptr;
public:
    friend ostream& operator<< (ostream& cout, CSTRING& c);
    friend istream& operator>> (istream& cin, CSTRING& c);
    CSTRING& operator= (CSTRING& c) {
        delete[] p;
        p = new char[strlen(c.p) + 1];
        strcpy(p, c.p);
        return *this;
    }
    bool operator> (CSTRING c) {
        return strcmp(p, c.p) > 0;
    }
};
istream& operator>> (istream& cin, CSTRING& c) {
    string tmp;
    cin >> tmp;
    delete[] c.p;
    c.p = new char [tmp.length() + 1];
    strcpy(c.p, tmp.c_str());
    return cin;
}
ostream& operator<< (ostream& cout, CSTRING& c) {
    cout << c.p;
    return cout;
}

int main()
{
    int n,i,j;
    cin>>n;
    CSTRING t,*cs=new CSTRING[n];
    for(i=0;i<n;i++)
        cin>>cs[i];
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(cs[j]>cs[j+1])
            {  t=cs[j];   cs[j]=cs[j+1];   cs[j+1]=t;   }
    for(i=0;i<n;i++)
        cout<<"("<<i+1<<") "<<cs[i]<<endl;
    delete[] cs;
    return 0;
}
```

### c++.2016 字符串 string 运算符重载（2）

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class CSTRING {
private:
    char* p = nullptr;
public:
    ~CSTRING() {
        if (p != nullptr) {
            delete[] p;
        }
    }
    friend ostream& operator<< (ostream& cout, CSTRING& c);
    friend istream& operator>> (istream& cin, CSTRING& c);
    CSTRING& operator=(CSTRING& c) {
        if (this == &c) return *this;
        delete[] p;
        if (c.p != nullptr) {
            p = new char[strlen(c.p) + 1];
            strcpy(p, c.p);
        } else {
            p = nullptr;
        }
        return *this;
    }
    CSTRING& operator+= (CSTRING& c) {
        if (c.p == nullptr) {
            return *this;
        }
        if (p == nullptr) {
            *this = c;
            return *this;
        }
        char* tmp = new char[strlen(c.p) + strlen(p) + 1];
        strcpy(tmp, p);
        strcat(tmp, c.p);
        delete[] p;
        p = tmp;
        return *this;
    }
};
istream& operator>> (istream& cin, CSTRING& c) {
    string tmp;
    cin >> tmp;
    delete[] c.p;
    c.p = new char [tmp.length() + 1];
    strcpy(c.p, tmp.c_str());
    return cin;
}
ostream& operator<< (ostream& cout, CSTRING& c) {
    cout << c.p;
    return cout;
}

int main()
{
    int n,i;
    cin>>n;
    CSTRING t,*cs=new CSTRING[n];
    for(i=0;i<n;i++)
        cin>>cs[i];
    for(i=0;i<n;i++)
        t+=cs[i];
    cout<<t<<endl;
    delete[] cs;
    return 0;
}
```

### c++.2017 矩形类运算符重载（2）

```c++
#include<iostream>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Rectangle {
public:
    double width, height;
    bool operator> (Rectangle& a) {
        return (width * height > a.height * a.width);
    }
};
double operator+ (double s, Rectangle& a) {
    return (s + a.width * a.height);
}
istream& operator>> (istream& cin, Rectangle& a) {
    cin >> a.width >> a.height;
    return cin;
}
ostream& operator<< (ostream& cout, Rectangle& a) {
    cout << "width=" << a.width << ",height=" << a.height << ",area=" << a.width * a.height;
    return cout;
}

int main()
{
    int n,i,j;
    double sum=0;
    cout<<fixed<<showpoint<<setprecision(2);
    cin>>n;
    Rectangle *rect=new Rectangle[n];
    for(i=0;i<n;i++)
        cin>>rect[i];
    for(i=0;i<n;i++)
        sum=sum+rect[i];
    for(i=0;i<n;i++)
        cout<<"("<<i+1<<")"<<rect[i]<<endl;
    cout<<"total area="<<sum<<endl;
    delete[] rect;
    return 0;
}
```

### c++.2018 复数类运算符重载（2）

```c++
#include<iostream>
#include<cmath>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Complex {
public:
    double real;
    double imag;
    bool operator> (Complex c) {
        return real * real + imag * imag > c.real * c.real + c.imag * c.imag;
    }
    Complex& operator= (Complex c) {
        real = c.real;
        imag = c.imag;
        return *this;
    }
};
istream& operator>> (istream& cin, Complex& a) {
    cin >> a.real >> a.imag;
    return cin;
}
ostream& operator<< (ostream& cout, Complex& c) {
    cout << "Modulus=" << sqrt(c.real * c.real + c.imag * c.imag) << "(";
    if (c.imag == 0) cout << c.real;
    else if (c.real == 0 && c.imag == 1) cout << "i";
    else if (c.real == 0 && c.imag == -1) cout << "-i";
    else if (c.real == 0) cout << c.imag << "i";
    else if (c.imag == 1) cout << c.real << "+i";
    else if (c.imag == -1) cout << c.real << "-i";
    else {
        if (c.imag > 0) cout << c.real << "+" << c.imag << "i";
        else cout << c.real << c.imag << "i";
    }
    cout << ")";
    return cout;
}

int main()
{
    int i,j,n;
    Complex t;
    cout<<fixed<<showpoint<<setprecision(5);
    cin>>n;
    Complex *c=new Complex[n];
    for(i=0;i<n;i++)
        cin>>c[i];
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(c[j]>c[j+1])
            {   t=c[j];    c[j]=c[j+1];   c[j+1]=t;  }
    for(i=0;i<n;i++)
        cout<<"("<<i+1<<")"<<c[i]<<endl;
    delete[]c;
    return 0;
}
```

### c++.2019 学生类运算符重载（2）

```c++
#include<iostream>
#include<cstring>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Student
{
public:
    int id;
    string name;
    int score;
    bool operator> (Student s)
    {
        if (this->score == s.score) return this->id > s.id;
        else return this->score > s.score;
    }
};
int operator+ (int a, Student s) {
    return a + s.score;
}
istream& operator>> (istream& cin, Student& s)
{
    cin >> s.id >> s.name >> s.score;
    return cin;
}
ostream& operator<< (ostream& cout, Student& s)
{
    cout << "id=" << s.id << ",name=" << s.name << ",score=" << s.score;
    return cout;
}

int main()
{
    cout<<fixed<<showpoint<<setprecision(5);
    int i,j,n,sum=0;
    cin>>n;
    Student *stu=new Student[n];
    for(i=0;i<n;i++)
        cin>>stu[i];
    for(i=0;i<n;i++)
    {
        cout<<"("<<i+1<<")"<<stu[i]<<endl;
        sum=sum+stu[i];
    }
    cout<<"average score="<<sum*1.0/n<<endl;
    delete[]stu;
    return 0;
}
```

### c++.2020 个人 Person 类运算符重载（2）

```c++
#include<iostream>
#include<cstring>
#include<iomanip>
using namespace std;

//你提交的代码在这里
class Person {
public:
    string name = "NULL";
    int age = 0;
    bool operator> (Person p) {
        if (age != p.age) {
            return age > p.age;
        }
        return name > p.name;
    }
    Person& operator= (Person p) {
        name = p.name;
        age = p.age;
        return *this;
    }
};
istream& operator>> (istream& cin, Person& s) {
    cin >> s.name >> s.age;
    return cin;
}
ostream& operator<< (ostream& cout, Person& s) {
    cout << "name=" << s.name << ",age=" << s.age;
    return cout;
}

int main()
{
    int n,i,j;
    Person t;
    cin>>n;
    Person *person=new Person[n];
    for(i=0;i<n;i++)
        cin>>person[i];
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(person[j]>person[j+1])
            { t=person[j];   person[j]=person[j+1];   person[j+1]=t;   }
    for(i=0;i<n;i++)
        cout<<"("<<i+1<<")"<<person[i]<<endl;
    delete[] person;
    return 0;
}
```

### c++.CSTRING 类的设计

```c++
#include<iostream>
#include<cstring>
using namespace std;

/* 你提交的代码在这里 */
class CSTRING {
public:
     char* p = nullptr;
     ~CSTRING() {
        if (p != nullptr) {
            delete[] p;
        }
     }
     CSTRING() {
        p = nullptr;
     }
     CSTRING(const CSTRING& other) {
        p = new char[strlen(other.p)+1];
        strcpy(p, other.p);
     }
     const char* GetData() const{
        return p ? p : "";
     }
     void Set (const char* s) {
        if (p != nullptr) {
            delete[] p;
        }
        p = new char[strlen(s) + 1];
        strcpy(p, s);
     }
     void Show() const{
        cout << p << endl;
     }
     CSTRING& operator= (const char* s) {
        if (p != nullptr) {
            delete[] p;
        }
        p = new char[strlen(s) + 1];
        strcpy(p, s);
        return *this;
     }

     CSTRING& operator= (const CSTRING& c) {
        if (p != nullptr) {
            delete[] p;
        }
        p = new char[strlen(c.p) + 1];
        strcpy(p, c.p);
        return *this;
     }
     CSTRING& operator+= (const CSTRING& c) {
        const char* tt = p ? p : "";
        char* tmp = new char[strlen(c.p) + strlen(tt) + 1];
        strcpy(tmp, tt);
        strcat(tmp, c.p);
        if (p != nullptr) {
            delete[] p;
        }
        p = tmp;
        return *this;
     }
     bool operator> (const CSTRING& c) {
        return strcmp(this->p, c.p) > 0;
     }
     CSTRING operator+ (const CSTRING& c) {
        CSTRING tmp;
        if (c.p == nullptr) {
            return *this;
        }
        tmp.p = new char[strlen(c.p) + strlen(p) + 1];
        strcpy(tmp.p, p);
        strcat(tmp.p, c.p);
        return tmp;
     }
     char& operator[] (int i) {
        return p[i];
     }
};
istream& operator>> (istream& cin, CSTRING& c) {
    string tmp;
    cin >> tmp;
    if (c.p != nullptr) {
        delete[] c.p;
    }
    c.p = new char[tmp.length() + 1];
    strcpy(c.p, tmp.c_str());
    return cin;
}
ostream& operator<< (ostream& cout, CSTRING& c) {
    cout << (c.p ? c.p : "");
    return cout;
}

int main()
{
    CSTRING t;
    cout<<"Length of string:"<<strlen(t.GetData())<<endl;
    t.Set("This is an example");
    t.Show();
    cout<<"Length of string:"<<strlen(t.GetData())<<endl;
    t="Sample";
    cout<<t<<endl;
    int n,i;
    cin>>n;
    CSTRING s,*cs;
    cs=new CSTRING[n];
    for(i=0;i<n;i++)
    {
        cin>>cs[i];
        s+=cs[i];
    }
    for(i=0;i<n;i++)
        cout<<"("<<i+1<<") "<<cs[i]<<endl;
    cout<<s<<endl;

    int j;
    for(i=0;i<n-1;i++)
        for(j=0;j<n-i-1;j++)
            if(cs[j]>cs[j+1])
            {  t=cs[j];   cs[j]=cs[j+1];   cs[j+1]=t;   }

    for(i=0;i<n;i++)
        cout<<"("<<i+1<<") "<<cs[i]<<endl;
    t[0]='\0';

    for(i=0;i<n;i++)
    {
        t=cs[i]+t;
    }
    cout<<t<<endl;
    delete[] cs;
    return 0;
}
```

### c++.3001 日期类（由时间类派生）

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class CTime {
private:
    int hour;
    int minute;
    int second;
public:
    CTime() {
        hour = 9;
        minute = 10;
        second = 11;
        cout << "Function #1 is called!" << endl;
    }
    CTime(int h, int mi, int s) {
        hour = h;
        minute = mi;
        second = s;
        cout << "Function #2 is called!" << endl;
    }
    CTime(const CTime& c) {
        hour = c.hour;
        minute = c.minute;
        second = c.second;
        cout << "Function #0 is called!" << endl;
    }
    void Show() {
        cout << hour << ":" << minute << ":" << second << endl;
        cout << "Function #3 is called!" << endl;
    }
};
class CDate : public CTime {
private:
    int year;
    int month;
    int day;
public:
    CDate() {
        year = 2023;
        month = 4;
        day = 5;
        cout << "Function #4 is called!" << endl;
    }
    CDate(int y, int m, int d) {
        year = y;
        month = m;
        day = d;
        cout << "Function #5 is called!" << endl;
    }
    CDate(int y, int m, int d, int h, int mi, int s) : CTime(h, mi, s) {
        year = y;
        month = m;
        day = d;
        cout << "Function #6 is called!" << endl;
    }
    CDate(int y, int m, int d, CTime& t) : CTime(t) {
        year = y;
        month = m;
        day = d;
        cout << "Function #7 is called!" << endl;
    }
    CDate(CTime& t) : CTime(t) {
        year = 2000;
        month = 12;
        day = 31;
        cout << "Function #8 is called!" << endl;
    }
    void Show() {
        cout << year << "-" << month << "-" << day << " ";
        CTime::Show();
        cout << "Function #9 is called!" << endl;
    }
};

int main()
{
    int dy,dm,dd,th,tm,ts;
    cin>>dy>>dm>>dd>>th>>tm>>ts;
    CTime t1;
    cout<<"[T1]";    t1.Show();
    CDate d1;
    cout<<"[D1]";    d1.Show();
    CDate d2(dy,dm,dd);
    cout<<"[D2]";    d2.Show();
    CDate d3(dy,dm,dd,th,tm,ts);
    cout<<"[D3]";    d3.Show();
    CDate d4(dy,dm,dd,t1);
    cout<<"[D4]";    d4.Show();
    CDate d5(t1);
    cout<<"[D5]";    d5.Show();
    return 0;
}
```

### c++.3002 圆类（由 Point 点类派生）

```c++
#include<iostream>
using namespace std;

//你提交的代码在这里
class Point {
private:
    int x, y;
public:
    Point() : x(19), y(210) {
        cout << "Function #1 is called!" << endl;
    }
    Point(int xx, int yy) : x(xx), y(yy) {
        cout << "Function #2 is called!" << endl;
    }
    Point(const Point& p) : x(p.x), y(p.y) {
        cout << "Function #0 is called!" << endl;
    }
    void Show() const{
        cout << "(" << x << ',' << y << ")" << endl;
        cout << "Function #3 is called!" << endl;
    }
};

class Circle : public Point {
private:
    int radius;
public:
    Circle() : radius(135) {
        cout << "Function #4 is called!" << endl;
    }
    Circle(int xx, int yy) : Point(xx, yy), radius(777) {
        cout << "Function #5 is called!" << endl;
    }
    Circle(int xx, int yy, int rr) : Point(xx, yy), radius(rr) {
        cout << "Function #6 is called!" << endl;
    }
    Circle(const Point& p0, int rr) : Point(p0), radius(rr) {
        cout << "Function #7 is called!" << endl;
    }
    Circle(const Point& p0) : Point(p0), radius(111) {
        cout << "Function #8 is called!" << endl;
    }
    Circle(int rr) : Point(5, 20), radius(rr) {
        cout << "Function #9 is called!" << endl;
    }
    void Show() const{
        cout << "Radius=" << radius << ",Center=";
        Point :: Show();
        cout << "Function #10 is called!" << endl;
    }
};

int main()
{
    int x,y,r;
    cin>>x>>y>>r;
    Point p0;
    cout<<"[Point #0] "; p0.Show();
    Circle c0;
    cout<<"[Circle #0]";  c0.Show();
    Circle c1(x,y);
    cout<<"[Circle #1]";  c1.Show();
    Circle c2(x,y,r);
    cout<<"[Circle #2]";  c2.Show();
    Circle c3(p0,r);
    cout<<"[Circle #3]";  c3.Show();
    Circle c4(p0);
    cout<<"[Circle #4]";  c4.Show();
    Circle c5(r);
    cout<<"[Circle #5]";  c5.Show();
    return 0;
}
```

### c++.3003Computer 计算机类（由 CPU 类派生）

```c++
#include<iostream>
#include<cstring>
using namespace std;

//你提交的代码在这里
class CPU {
private:
    string fy, ty;
public:
    CPU() : fy("Unknown"), ty("Unknown") {
        cout << "Function #1 is called!" << endl;
    }
    CPU(string a, string b) : fy(a), ty(b) {
        cout << "Function #2 is called!" << endl;
    }
    CPU(const CPU& tmp) : fy(tmp.fy), ty(tmp.ty) {
        //cout << "Function #0 is called!" << endl;
    }
    void Show() const {
        cout << fy << " " << ty << endl;
        cout << "Function #3 is called!" << endl;
    }
};
class Computer : public CPU {
private:
    string brand, type;
    int ram, price;
public:
    Computer() : brand("None"), type("None"), ram(0), price(0) {
        cout << "Function #4 is called!" << endl;
    }
    Computer(string a, string b, int r, int p, string c, string d) : CPU(c, d), brand(a), type(b), ram(r), price(p) {
        cout << "Function #5 is called!" << endl;
    }
    Computer(string a, string b, int r, int p, const CPU& tmp) : CPU(tmp), brand(a), type(b), ram(r), price(p) {
        cout << "Function #6 is called!" << endl;
    }
    Computer(string a, string b, int r, int p) : brand(a), type(b), ram(r), price(p) {
        cout << "Function #7 is called!" << endl;
    }
    Computer(const CPU& tmp) : CPU(tmp), brand("None"), type("None"), ram(0), price(0) {
        cout << "Function #8 is called!" << endl;
    }
    void Show() const {
        cout << "Brand:" << brand << " Type:" << type << " Memory:" << ram << " Price:" << price;
        cout << " CPU:";
        CPU :: Show();
        cout << "Function #9 is called!" << endl;
    }
};

int main()
{
    char s1[40],s2[40],s3[40],s4[40];
    int ram,price;
    cin>>s1>>s2>>ram>>price>>s3>>s4;

    CPU cpu0;
    cout<<"CPU 0:"; cpu0.Show();
    CPU cpu1(s3,s4);
    cout<<"CPU 1:"; cpu1.Show();
    Computer computer0;
    cout<<"Computer0: ";     computer0.Show();
    Computer computer1(s1,s2,ram,price,s3,s4);
    cout<<"Computer1: ";     computer1.Show();
    Computer computer2(s1,s2,ram,price,cpu1);
    cout<<"Computer2: ";     computer2.Show();
    Computer computer3(s1,s2,ram,price);
    cout<<"Computer3: ";     computer3.Show();
    Computer computer4(cpu1);
    cout<<"Computer4: "; computer4.Show();
    return 0;
}
```

最近比较忙 更新较慢（期末前应该还是来得及的

## 好忙好忙~ 实在是啃不动了，下面代码是我朋友的 ac 码，提供参考

### c++.3004Province 省类（由 Country 国家类派生）

```c++
class Country {
protected:
    char name[40];
    char capital[40];
    int population;
public:
    Country() {
        strcpy(name, "Noname");
        strcpy(capital, "Unknown");
        population = 0;
        cout << "Function #1 is called!" << endl;
    }
    Country(const char* n, const char* c, int p) {
        strcpy(name, n);
        strcpy(capital, c);
        population = p;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << name << "(Capital:" << capital << " population:" << population << ")" << endl;
        cout << "Function #3 is called!" << endl;
    }
};

class Province : public Country {
private:
    char provName[40];
    char provCapital[40];
    int provPopulation;
public:
    Province() {
        strcpy(provName, "None");
        strcpy(provCapital, "None");
        provPopulation = 0;
        cout << "Function #4 is called!" << endl;
    }
    Province(const char* pn, const char* pc, int pp, const char* cn, const char* cc, int cp) : Country(cn, cc, cp) {
        strcpy(provName, pn);
        strcpy(provCapital, pc);
        provPopulation = pp;
        cout << "Function #5 is called!" << endl;
    }
    Province(const char* pn, const char* pc, int pp, const Country& c) : Country(c) {
        strcpy(provName, pn);
        strcpy(provCapital, pc);
        provPopulation = pp;
        cout << "Function #6 is called!" << endl;
    }
    Province(const char* pn, const char* pc, int pp) {
        strcpy(provName, pn);
        strcpy(provCapital, pc);
        provPopulation = pp;
        cout << "Function #7 is called!" << endl;
    }
    Province(const Country& c) : Country(c) {
        strcpy(provName, "None");
        strcpy(provCapital, "None");
        provPopulation = 0;
        cout << "Function #8 is called!" << endl;
    }
    void Show() const {
        cout << provName << ":provincial capital(" << provCapital << "),population(" << provPopulation << "),Country:";
        Country::Show();
        cout << "Function #9 is called!" << endl;
    }
};
```

### c++3005Rectangle 矩形类（由 Point 点类派生）

```c++
class Point {
protected:
    int X;
    int Y;
public:
    Point() {
        X = 0;
        Y = 0;
        cout << "Function #1 is called!" << endl;
    }
    Point(int x, int y) {
        X = x;
        Y = y;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << "(" << X << "," << Y << ")" << endl;
        cout << "Function #3 is called!" << endl;
    }
};

class Rectangle : public Point {
private:
    int width;
    int height;
public:
    Rectangle():Point(6,7) {
        width = 0;
        height = 0;
        cout << "Function #4 is called!" << endl;
    }
    Rectangle(int x, int y, int w, int h) : Point(x, y) {
        width = w;
        height = h;
        cout << "Function #5 is called!" << endl;
    }
    Rectangle(Point p, int w, int h) : Point(p) {
        width = w;
        height = h;
        cout << "Function #6 is called!" << endl;
    }
    Rectangle(int w, int h):Point(100,110) {
        width = w;
        height = h;
        cout << "Function #7 is called!" << endl;
    }
    Rectangle(Point p) : Point(p) {
        width = 10;
        height = 11;
        cout << "Function #8 is called!" << endl;
    }
    void Show() const {
        cout << "Width=" << width << " Height=" << height << " Left_Up=";
        Point::Show();
        cout << "Function #9 is called!" << endl;
    }
};
```

### c++.3006Three_dimensional 三维坐标类（由 Point 点类派生）

```c++
class Point {
protected:
    int x;
    int y;
public:
    Point() {
        x = 0;
        y = 0;
        cout << "Function #1 is called!" << endl;
    }
    Point(int x, int y) {
        this->x = x;
        this->y = y;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << "(" << x << "," << y << ")" << endl;
        cout << "Function #3 is called!" << endl;
    }
};

class Three_dimensional : public Point {
private:
    int z;
public:
    Three_dimensional() {
        z = 0;
        cout << "Function #4 is called!" << endl;
    }
    Three_dimensional(int x, int y, int z) : Point(x, y) {
        this->z = z;
        cout << "Function #5 is called!" << endl;
    }
    Three_dimensional(Point p, int z) : Point(p) {
        this->z = z;
        cout << "Function #6 is called!" << endl;
    }
    Three_dimensional(int z):Point(100,210) {
        this->z = z;
        cout << "Function #7 is called!" << endl;
    }
    Three_dimensional(Point p) : Point(p) {
        z = 11;
        cout << "Function #8 is called!" << endl;
    }
    void Show() const {
        cout << "(" << x << "," << y << "," << z << ")" << endl;
        cout << "Function #9 is called!" << endl;
    }
};
```

### c++.3007Person 人员类（由 CDate 日期类派生）

```c++
class CDate {
protected:
    int year;
    int month;
    int day;
public:
    CDate() {
        year = 2023;
        month = 6;
        day = 17;
        cout << "Function #1 is called!" << endl;
    }
    CDate(int y, int m, int d) {
        year = y;
        month = m;
        day = d;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << year << "-" << month << "-" << day << endl;
        cout << "Function #3 is called!" << endl;
    }
};

class Person : public CDate {
private:
    char name[40];
    int score;
public:
    Person() {
        strcpy(name, "Unknown");
        score = 0;
        cout << "Function #4 is called!" << endl;
    }
    Person(const char* n, int s, int y, int m, int d) : CDate(y, m, d) {
        strcpy(name, n);
        score = s;
        cout << "Function #5 is called!" << endl;
    }
    Person(const char* n, int s, const CDate& d) : CDate(d) {
        strcpy(name, n);
        score = s;
        cout << "Function #6 is called!" << endl;
    }
    Person(const char* n, int s) :CDate(2000,12,31){
        strcpy(name, n);
        score = s;
        cout << "Function #7 is called!" << endl;
    }
    Person(const CDate& d) : CDate(d) {
        strcpy(name, "Unknown");
        score = 0;
        cout << "Function #8 is called!" << endl;
    }
    void Show() const {
        cout << "Name:" << name << "  score:" << score << " birthday:";
        CDate::Show();
        cout << "Function #9 is called!" << endl;
    }
};
```

### c++.3008Teacher 教师类（由 Person 人员类派生）

```c++
class Person {
protected:
    char name[40];
    char sex[3];
    int age;
public:
    Person() {
        strcpy(name, "Unknown");
        strcpy(sex, "No");
        age = 0;
        cout << "Function #1 is called!" << endl;
    }
    Person(const char* n, const char* s, int a) {
        strcpy(name, n);
        strcpy(sex, s);
        age = a;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << "NAME:" << name << " SEX:" << sex << " AGE:" << age << endl;
        cout << "Function #3 is called!" << endl;
    }
};

class Teacher : public Person {
private:
    char title[40];
    int pay;
public:
    Teacher() {
        strcpy(title, "NONE");
        pay = 0;
        cout << "Function #4 is called!" << endl;
    }
    Teacher(const char* n, const char* s, int a, const char* t, int p) : Person(n, s, a) {
        strcpy(title, t);
        pay = p;
        cout << "Function #5 is called!" << endl;
    }
    Teacher(const Person& p, const char* t, int p2) : Person(p) {
        strcpy(title, t);
        pay = p2;
        cout << "Function #6 is called!" << endl;
    }
    Teacher(const char* t, int p) {
        strcpy(title, t);
        pay = p;
        strcpy(name, "Unknown");
        strcpy(sex, "No");
        age = 0;
        cout << "Function #7 is called!" << endl;
    }
    Teacher(const Person& p) : Person(p) {
        strcpy(title, "NONE");
        pay = 0;
        cout << "Function #8 is called!" << endl;
    }
    void Show() const {
        cout << "NAME:" << name << " SEX:" << sex << " AGE:" << age << " TITLE:" << title << " PAY:" << pay << endl;
        cout << "Function #9 is called!" << endl;
    }
};
```

### c++.3009Student 学生类（由 Person 人员类派生）

```c++
class Person {
protected:
    char name[40];
    char sex[3];
    int age;
public:
    Person() {
        strcpy(name, "Unknown");
        strcpy(sex, "No");
        age = 0;
        cout << "Function #1 is called!" << endl;
    }
    Person(const char* n, const char* s, int a) {
        strcpy(name, n);
        strcpy(sex, s);
        age = a;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << "NAME:" << name << " SEX:" << sex << " AGE:" << age << endl;
    }
};

class Student : public Person {
private:
    char Class[40];
    char major[40];
    int score;
public:
    Student() {
        strcpy(Class, "NONE");
        strcpy(major, "NONE");
        score = 100;
        cout << "Function #3 is called!" << endl;
    }
    Student(const char* n, const char* s, int a, const char* c, const char* m, int sc) : Person(n, s, a) {
        strcpy(Class, c);
        strcpy(major, m);
        score = sc;
        cout << "Function #4 is called!" << endl;
    }
    Student(const Person& p, const char* c, const char* m, int sc) : Person(p) {
        strcpy(Class, c);
        strcpy(major, m);
        score = sc;
        cout << "Function #5 is called!" << endl;
    }
    Student(const char* c, const char* m, int sc) {
        strcpy(Class, c);
        strcpy(major, m);
        score = sc;
        strcpy(name, "Unknown");
        strcpy(sex, "No");
        age = 0;
        cout << "Function #6 is called!" << endl;
    }
    Student(const Person& p) : Person(p) {
        strcpy(Class, "NONE");
        strcpy(major, "NONE");
        score = 100;
        cout << "Function #7 is called!" << endl;
    }
    void Show() const {
        cout << "NAME:" << name << " SEX:" << sex << " AGE:" << age
            << " CLASS:" << Class << " MAJOR:" << major << " SCORE:" << score << endl;
    }
};
```

### c++.3010Dog 狗类（由 Mammal 哺乳动物类派生）

```c++
#include<iostream>
#include<cstring>
using namespace std;

class Mammal {
protected:
    int age;
    int weight;
public:
    Mammal() {
        age = 0;
        weight = 0;
        cout << "Function #1 is called!" << endl;
    }
    Mammal(int a, int w) {
        age = a;
        weight = w;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << "AGE:" << age << " WEIGHT:" << weight << "kg" << endl;
    }
};

class Dog : public Mammal {
private:
    char name[40];
    int color;
public:
    Dog() {
        strcpy(name, "Unknown");
        color = 1;
        cout << "Function #3 is called!" << endl;
    }
    Dog(const char* n, int a, int w, int c) : Mammal(a, w) {
        strcpy(name, n);
        color = c;
        cout << "Function #4 is called!" << endl;
    }
    Dog(const Mammal& m, const char* n, int c) : Mammal(m) {
        strcpy(name, n);
        color = c;
        cout << "Function #5 is called!" << endl;
    }
    Dog(const char* n, int c) {
        strcpy(name, n);
        color = c;
        age = 0;
        weight = 0;
        cout << "Function #6 is called!" << endl;
    }
    Dog(const Mammal& m) : Mammal(m) {
        strcpy(name, "NoName");
        color = 2;
        cout << "Function #7 is called!" << endl;
    }
    void Show() const {
        cout << "NAME:" << name << " COLOR:" << color << " AGE:" << age << " WEIGHT:" << weight << "kg" << endl;
    }
};
```

### c++.3011Sofa 沙发类（由 Furniture 家具类派生）

```c++
#include<iostream>
#include<string>
using namespace std;

class Furniture {
protected:
    string nat;
    int price;
public:
    Furniture() {
        nat = "Unknown";
        price = 0;
        cout << "Function #1 is called!" << endl;
    }
    Furniture(string m, int p) {
        nat = m;
        price = p;
        cout << "Function #2 is called!" << endl;
    }
    void Show() const {
        cout << "MATERIAL:" << nat << "/PRICE:" << price << endl;
    }
};

class Sofa : public Furniture {
private:
    int seats;
public:
    Sofa() {
        seats = 2;
        cout << "Function #3 is called!" << endl;
    }
    Sofa(string m, int p, int s) : Furniture(m, p) {
        seats = s;
        cout << "Function #4 is called!" << endl;
    }
    Sofa(const Furniture& f, int s) : Furniture(f) {
        seats = s;
        cout << "Function #5 is called!" << endl;
    }
    Sofa(int s) {
        seats = s;
        nat = "Unknown";
        price = 0;
        cout << "Function #6 is called!" << endl;
    }
    Sofa(const Furniture& f) : Furniture(f) {
        seats = 5;
        cout << "Function #7 is called!" << endl;
    }
    void Show() const {
        cout << "SEATS:" << seats << "/MATERIAL:" << nat << "/PRICE:" << price << endl;
    }
};
```

### c++.3012Bed 床类（由 Furniture 家具类派生）

```c++
#include<iostream>
#include<string>
using namespace std;

class Furniture {
private:
    string nat;
    int price;
public:
    Furniture() : nat("Unknown"), price(0) {
        cout << "Function #1 is called!" << endl;
    }
    Furniture(string mat, int p) : nat(mat), price(p) {
        cout << "Function #2 is called!" << endl;
    }
    void Show() {
        cout << "MATERIAL:" << nat << "/PRICE:" << price << endl;
    }
    string getNat() const { return nat; }
    int getPrice() const { return price; }
};

class Bed : public Furniture {
private:
    string bedtype;
public:
    Bed() : bedtype("NONE") {
        cout << "Function #3 is called!" << endl;
    }
    Bed(string mat, int p, string type) : Furniture(mat, p), bedtype(type) {
        cout << "Function #4 is called!" << endl;
    }
    Bed(const Furniture& fur, string type) : Furniture(fur), bedtype(type) {
        cout << "Function #5 is called!" << endl;
    }
    Bed(string type) : bedtype(type) {
        cout << "Function #6 is called!" << endl;
    }
    Bed(const Furniture& fur) : Furniture(fur), bedtype("unknown") {
        cout << "Function #7 is called!" << endl;
    }
    void Show() {
        cout << "BedType:" << bedtype << "/";
        Furniture::Show();
    }
};
```

### c++.3013AlarmClock 闹钟类（由 Clock 钟表类派生）

```C++
class Clock {
protected:
    int hour;
    int minute;
    int second;
public:
    Clock() : hour(0), minute(0), second(0) {
        cout << "Function #1 is called!" << endl;
    }
    Clock(int h, int m, int s) : hour(h), minute(m), second(s) {
        cout << "Function #2 is called!" << endl;
    }
    void Show() {
        cout << "Current Time:" << hour << ":" << minute << ":" << second << endl;
    }
    int getHour() const { return hour; }
    int getMinute() const { return minute; }
    int getSecond() const { return second; }
};

class AlarmClock : public Clock {
private:
    int on;
    int AlarmHour;
    int AlarmMinute;
public:
    AlarmClock() : on(0), AlarmHour(8), AlarmMinute(10) {
        cout << "Function #3 is called!" << endl;
    }
    AlarmClock(int h, int m, int s, int o, int ah, int am) : Clock(h, m, s), on(o), AlarmHour(ah), AlarmMinute(am) {
        cout << "Function #4 is called!" << endl;
    }
    AlarmClock(const Clock& c, int o, int ah, int am) : Clock(c), on(o), AlarmHour(ah), AlarmMinute(am) {
        cout << "Function #5 is called!" << endl;
    }
    AlarmClock(int o, int ah, int am) : Clock(1, 2, 3), on(o), AlarmHour(ah), AlarmMinute(am) {
        cout << "Function #6 is called!" << endl;
    }
    AlarmClock(const Clock& c) : Clock(c), on(0), AlarmHour(1), AlarmMinute(2) {
        cout << "Function #7 is called!" << endl;
    }
    void Show() {
        cout << "Current Time:" << hour << ":" << minute << ":" << second << " AlarmTime:" << AlarmHour << ":" << AlarmMinute;
        if (on == 1) {
            cout << " AlarmClock on" << endl;
        }
        else {
            cout << " AlarmClock off" << endl;
        }
    }
};
```

### c++.3014Doctor 医生类（由 Person 人员类派生）

```C++
class Person {
protected:
    char name[40];
    char sex[3];
    int age;
public:
    Person() {
        strcpy(name, "Unknown");
        strcpy(sex, "No");
        age = 0;
        cout << "Function #1 is called!" << endl;
    }
    Person(const char* n, const char* s, int a) {
        strcpy(name, n);
        strcpy(sex, s);
        age = a;
        cout << "Function #2 is called!" << endl;
    }
    void Show() {
        cout << "NAME:" << name << " SEX:" << sex << " AGE:" << age << endl;
    }
    const char* getName() const { return name; }
    const char* getSex() const { return sex; }
    int getAge() const { return age; }
};

class Doctor : public Person {
private:
    char specialty[40];
    int office_visit_fee;
public:
    Doctor() : office_visit_fee(10000) {
        strcpy(specialty, "NONE");
        cout << "Function #3 is called!" << endl;
    }
    Doctor(const char* n, const char* s, int a, const char* sp, int fee) : Person(n, s, a), office_visit_fee(fee) {
        strcpy(specialty, sp);
        cout << "Function #4 is called!" << endl;
    }
    Doctor(const Person& p, const char* sp, int fee) : Person(p), office_visit_fee(fee) {
        strcpy(specialty, sp);
        cout << "Function #5 is called!" << endl;
    }
    Doctor(const char* sp, int fee) : office_visit_fee(fee) {
        strcpy(specialty, sp);
        cout << "Function #6 is called!" << endl;
    }
    Doctor(const Person& p) : Person(p), office_visit_fee(20) {
        strcpy(specialty, "None");
        cout << "Function #7 is called!" << endl;
    }
    void Show() {
        cout << "NAME:" << name << " SEX:" << sex << " AGE:" << age << " SPECIALTY:" << specialty << " OFFICE_VISIT_FEE:" << office_visit_fee << endl;
    }
};
```

### c++.3015Employee 雇员类（由 Person 人员类派生）

```C++
#include<iostream>
#include<cstring>
using namespace std;

class Person {
protected:
    char name[40];
    int gender;
    int age;
public:
    Person() {
        strcpy(name, "Unknown");
        gender = -1;
        age = 0;
        cout << "Function #1 is called!" << endl;
    }
    Person(const char* n, int g, int a) {
        strcpy(name, n);
        gender = g;
        age = a;
        cout << "Function #2 is called!" << endl;
    }
    void Show() {
        cout << "NAME:" << name << " GENDER:";
        if (gender == 1) {
            cout << "male";
        } else if (gender == 0) {
            cout << "female";
        } else {
            cout << "blank";
        }
        cout << " AGE:" << age << endl;
    }
    const char* getName() const { return name; }
    int getGender() const { return gender; }
    int getAge() const { return age; }
};

class Employee : public Person {
private:
    char department[40];
    int salary;
public:
    Employee() : salary(99999999) {
        strcpy(department, "NONE");
        cout << "Function #3 is called!" << endl;
    }
    Employee(const char* n, int g, int a, const char* d, int s) : Person(n, g, a), salary(s) {
        strcpy(department, d);
        cout << "Function #4 is called!" << endl;
    }
    Employee(const Person& p, const char* d, int s) : Person(p), salary(s) {
        strcpy(department, d);
        cout << "Function #5 is called!" << endl;
    }
    Employee(const char* d, int s) : salary(s) {
        strcpy(department, d);
        cout << "Function #6 is called!" << endl;
    }
    Employee(const Person& p) : Person(p), salary(100000000) {
        strcpy(department, "unknown");
        cout << "Function #7 is called!" << endl;
    }
    void Show() {
        cout << "NAME:" << name << " GENDER:";
        if (gender == 1) {
            cout << "male";
        } else if (gender == 0) {
            cout << "female";
        } else {
            cout << "blank";
        }
        cout << " AGE:" << age << "DEPARTMENT:" << department << " SALARY:" << salary << endl;
    }
};
```

### 如有问题，欢迎评论！

# 至此！完结撒花~
