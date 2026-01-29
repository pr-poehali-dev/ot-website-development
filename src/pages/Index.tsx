import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('npa');
  const [selectedNPA, setSelectedNPA] = useState<any>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportType, setReportType] = useState('');
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const npaDocuments = [
    {
      id: 1,
      title: 'ГОСТ Р 22.8.17-2025',
      category: 'ГОСТ',
      date: '2026',
      status: 'Действует',
      description: 'Безопасность в чрезвычайных ситуациях. Поисково-спасательные работы в условиях разрушенных зданий',
      content: 'Добавлены подробные требования к организации работ, зонированию, управлению рисками и безопасности спасателей.',
    },
    {
      id: 2,
      title: 'ГОСТ ISO 18889-2025',
      category: 'ГОСТ',
      date: '2026',
      status: 'Действует',
      description: 'Средства индивидуальной защиты рук. Перчатки для защиты работников при обращении с пестицидами',
      content: 'Введены конкретные критерии для перчаток при работе с пестицидами.',
    },
    {
      id: 3,
      title: 'ГОСТ ISO 11612-2020',
      category: 'ГОСТ',
      date: '2026',
      status: 'Действует',
      description: 'Одежда специальная для защиты от кратковременного воздействия открытого пламени',
      content: 'Введены более точные методы оценки спецодежды от мелкодисперсной пыли и аэрозолей.',
    },
    {
      id: 4,
      title: 'Профстандарт "Специалист в области охраны труда"',
      category: 'Профстандарт',
      date: '01.03.2026',
      status: 'Вступает в силу',
      description: 'Новый профессиональный стандарт для специалистов по охране труда',
      content: 'Определяет не только формальные требования к должности, но и роль специалиста внутри организации.',
    },
    {
      id: 5,
      title: 'ОК 016-2025',
      category: 'Классификатор',
      date: '01.01.2026',
      status: 'Действует',
      description: 'Общероссийский классификатор профессий',
      content: 'Вводится вместо устаревшего ОК 016-94.',
    },
    {
      id: 6,
      title: 'Форма №1-Т "Условия труда"',
      category: 'Отчётность',
      date: '01.01.2026',
      status: 'Обязательна',
      description: 'Новая форма отчётности о состоянии условий труда',
      content: 'Содержит сведения о состоянии условий труда и компенсациях за работу с вредными и (или) опасными условиями труда.',
    },
  ];

  const courses = [
    {
      id: 1,
      title: 'Основы охраны труда',
      duration: '40 часов',
      level: 'Базовый',
      description: 'Комплексный курс по основам охраны труда для специалистов',
    },
    {
      id: 2,
      title: 'Специальная оценка условий труда',
      duration: '24 часа',
      level: 'Продвинутый',
      description: 'Методика проведения и оформления СОУТ',
    },
    {
      id: 3,
      title: 'Расследование несчастных случаев',
      duration: '16 часов',
      level: 'Специализированный',
      description: 'Порядок расследования и оформления НС на производстве',
    },
  ];

  const testQuestions = [
    {
      question: 'Какой документ вступает в силу 01.03.2026?',
      answers: [
        'ГОСТ Р 22.8.17-2025',
        'Профстандарт "Специалист в области охраны труда"',
        'ОК 016-2025',
        'Форма №1-Т',
      ],
      correct: 1,
    },
    {
      question: 'Какой классификатор заменяет ОК 016-94?',
      answers: ['ОК 015-2025', 'ОК 016-2025', 'ОК 017-2025', 'ОК 018-2025'],
      correct: 1,
    },
    {
      question: 'С какой даты обязательна форма №1-Т?',
      answers: ['01.01.2025', '01.01.2026', '01.03.2026', '01.06.2026'],
      correct: 1,
    },
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openNPADialog = (npa: any) => {
    setSelectedNPA(npa);
  };

  const openReportDialog = (type: string) => {
    setReportType(type);
    setShowReportDialog(true);
  };

  const generateReport = () => {
    toast.success('Отчёт успешно сформирован!');
    setShowReportDialog(false);
  };

  const startTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowTestDialog(true);
  };

  const submitAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correct = selectedAnswers.filter((ans, idx) => ans === testQuestions[idx].correct).length;
      toast.success(`Тест завершён! Правильных ответов: ${correct} из ${testQuestions.length}`);
      setShowTestDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <nav className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Shield" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">Охрана Труда Pro</h1>
                <p className="text-xs text-sidebar-foreground/70">Профессиональная платформа</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => scrollToSection('npa')} className="text-sidebar-foreground hover:bg-sidebar-accent">
                <Icon name="FileText" size={16} className="mr-2" />
                База НПА
              </Button>
              <Button variant="ghost" size="sm" onClick={() => scrollToSection('education')} className="text-sidebar-foreground hover:bg-sidebar-accent">
                <Icon name="GraduationCap" size={16} className="mr-2" />
                Обучение
              </Button>
              <Button variant="ghost" size="sm" onClick={() => scrollToSection('reports')} className="text-sidebar-foreground hover:bg-sidebar-accent">
                <Icon name="FileEdit" size={16} className="mr-2" />
                Отчёты
              </Button>
              <Button variant="ghost" size="sm" onClick={() => scrollToSection('testing')} className="text-sidebar-foreground hover:bg-sidebar-accent">
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Тестирование
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">Версия 2026</Badge>
          <h2 className="text-4xl font-bold mb-4 text-foreground">Всё для специалиста по охране труда</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Актуальная база НПА, система обучения персонала, конструктор отчётов и проверка знаний — всё в одной платформе
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('npa')} className="gap-2">
              <Icon name="FileSearch" size={20} />
              Изучить базу НПА
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('reports')} className="gap-2">
              <Icon name="Download" size={20} />
              Создать отчёт
            </Button>
          </div>
        </div>
      </section>

      <section id="npa" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="FileText" className="text-primary" size={32} />
            <div>
              <h3 className="text-3xl font-bold">База актуальных НПА</h3>
              <p className="text-muted-foreground">Нормативно-правовые акты, вступающие в силу в 2026 году</p>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">Все документы</TabsTrigger>
              <TabsTrigger value="gost">ГОСТ</TabsTrigger>
              <TabsTrigger value="standards">Профстандарты</TabsTrigger>
              <TabsTrigger value="reports">Отчётность</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npaDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openNPADialog(doc)}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={doc.status === 'Действует' ? 'default' : 'secondary'}>{doc.status}</Badge>
                    <Badge variant="outline">{doc.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={16} />
                    <span>Дата: {doc.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="GraduationCap" className="text-primary" size={32} />
            <div>
              <h3 className="text-3xl font-bold">Обучение персонала</h3>
              <p className="text-muted-foreground">Курсы и материалы для повышения квалификации</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{course.level}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full gap-2">
                    <Icon name="PlayCircle" size={16} />
                    Начать курс
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Материалы для изучения</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Icon name="Book" size={20} />
                      Методические указания по СОУТ
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">
                      Подробные методические материалы по проведению специальной оценки условий труда согласно последним требованиям законодательства.
                    </p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="Download" size={16} />
                      Скачать PDF
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Icon name="FileCheck" size={20} />
                      Инструкции по охране труда
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">Типовые инструкции по охране труда для различных профессий и видов работ.</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="Download" size={16} />
                      Скачать архив
                    </Button>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Icon name="Video" size={20} />
                      Видеоматериалы
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground mb-4">Обучающие видео по основным темам охраны труда.</p>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon name="Play" size={16} />
                      Смотреть
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reports" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="FileEdit" className="text-primary" size={32} />
            <div>
              <h3 className="text-3xl font-bold">Конструктор отчётов</h3>
              <p className="text-muted-foreground">Создание приказов, актов Н-1 и направлений на МО онлайн</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openReportDialog('order')}>
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="FileText" className="text-primary" size={24} />
                </div>
                <CardTitle>Приказ</CardTitle>
                <CardDescription>Создание приказов по охране труда</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Создать приказ
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openReportDialog('n1')}>
              <CardHeader>
                <div className="bg-destructive/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="AlertTriangle" className="text-destructive" size={24} />
                </div>
                <CardTitle>Акт Н-1</CardTitle>
                <CardDescription>Оформление акта о несчастном случае</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Создать акт Н-1
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openReportDialog('medical')}>
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Stethoscope" className="text-accent" size={24} />
                </div>
                <CardTitle>Направление на МО</CardTitle>
                <CardDescription>Направление на медицинский осмотр</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Создать направление
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testing" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="CheckCircle" className="text-primary" size={32} />
            <div>
              <h3 className="text-3xl font-bold">Проверка знаний</h3>
              <p className="text-muted-foreground">Система тестирования персонала по охране труда</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Тест по НПА 2026</CardTitle>
                <CardDescription>Проверьте знание новых документов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Вопросов:</span>
                  <Badge>{testQuestions.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Время:</span>
                  <Badge variant="outline">10 минут</Badge>
                </div>
                <Button className="w-full gap-2" onClick={startTest}>
                  <Icon name="Play" size={16} />
                  Начать тест
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>История тестирования</CardTitle>
                <CardDescription>Результаты предыдущих попыток</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[150px]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">15.01.2026</span>
                      <Badge variant="default">85%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">10.01.2026</span>
                      <Badge variant="secondary">92%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">05.01.2026</span>
                      <Badge variant="outline">78%</Badge>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-sidebar border-t border-sidebar-border py-8 px-4">
        <div className="container mx-auto text-center text-sidebar-foreground/70">
          <p className="text-sm">© 2026 Охрана Труда Pro. Профессиональная платформа для специалистов.</p>
        </div>
      </footer>

      <Dialog open={selectedNPA !== null} onOpenChange={() => setSelectedNPA(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedNPA?.title}</DialogTitle>
            <DialogDescription>{selectedNPA?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge>{selectedNPA?.category}</Badge>
              <Badge variant="outline">{selectedNPA?.status}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Основные положения:</h4>
              <p className="text-muted-foreground">{selectedNPA?.content}</p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2">
                <Icon name="Download" size={16} />
                Скачать документ
              </Button>
              <Button variant="outline" className="gap-2">
                <Icon name="Copy" size={16} />
                Копировать ссылку
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {reportType === 'order' && 'Создание приказа'}
              {reportType === 'n1' && 'Создание акта Н-1'}
              {reportType === 'medical' && 'Создание направления на МО'}
            </DialogTitle>
            <DialogDescription>Заполните необходимые данные для формирования документа</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 pr-4">
              <div className="space-y-2">
                <Label>Организация</Label>
                <Input placeholder="Название организации" />
              </div>
              <div className="space-y-2">
                <Label>Дата</Label>
                <Input type="date" />
              </div>
              {reportType === 'order' && (
                <>
                  <div className="space-y-2">
                    <Label>Тип приказа</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sout">О проведении СОУТ</SelectItem>
                        <SelectItem value="instruction">Об утверждении инструкций</SelectItem>
                        <SelectItem value="training">Об организации обучения</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Содержание приказа</Label>
                    <Textarea placeholder="Текст приказа..." rows={6} />
                  </div>
                </>
              )}
              {reportType === 'n1' && (
                <>
                  <div className="space-y-2">
                    <Label>ФИО пострадавшего</Label>
                    <Input placeholder="Полное ФИО" />
                  </div>
                  <div className="space-y-2">
                    <Label>Должность</Label>
                    <Input placeholder="Должность пострадавшего" />
                  </div>
                  <div className="space-y-2">
                    <Label>Дата и время происшествия</Label>
                    <Input type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label>Место происшествия</Label>
                    <Input placeholder="Точное место" />
                  </div>
                  <div className="space-y-2">
                    <Label>Описание обстоятельств</Label>
                    <Textarea placeholder="Подробное описание..." rows={6} />
                  </div>
                </>
              )}
              {reportType === 'medical' && (
                <>
                  <div className="space-y-2">
                    <Label>ФИО сотрудника</Label>
                    <Input placeholder="Полное ФИО" />
                  </div>
                  <div className="space-y-2">
                    <Label>Должность</Label>
                    <Input placeholder="Должность сотрудника" />
                  </div>
                  <div className="space-y-2">
                    <Label>Тип медосмотра</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preliminary">Предварительный</SelectItem>
                        <SelectItem value="periodic">Периодический</SelectItem>
                        <SelectItem value="extraordinary">Внеочередной</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Медицинское учреждение</Label>
                    <Input placeholder="Название учреждения" />
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              Отмена
            </Button>
            <Button onClick={generateReport} className="gap-2">
              <Icon name="FileCheck" size={16} />
              Сформировать документ
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Тест по НПА 2026</DialogTitle>
            <DialogDescription>
              Вопрос {currentQuestion + 1} из {testQuestions.length}
            </DialogDescription>
          </DialogHeader>
          {testQuestions[currentQuestion] && (
            <div className="space-y-4">
              <p className="font-semibold">{testQuestions[currentQuestion].question}</p>
              <RadioGroup onValueChange={(value) => submitAnswer(parseInt(value))}>
                {testQuestions[currentQuestion].answers.map((answer, idx) => (
                  <div key={idx} className="flex items-center space-x-2 border rounded p-3 hover:bg-muted cursor-pointer">
                    <RadioGroupItem value={idx.toString()} id={`answer-${idx}`} />
                    <Label htmlFor={`answer-${idx}`} className="cursor-pointer flex-1">
                      {answer}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
