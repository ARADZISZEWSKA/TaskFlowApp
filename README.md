# **TaskFlow**

## **Charakterystyka oprogramowania**

### a) Nazwa skrócona: 
TaskFlow

### b) Nazwa pełna: 
Aplikacja do zarządzania zadaniami projektowymi TaskFlow

### c) Opis: 
Aplikacja TaskFlow została zaprojektowana z myślą o umożliwieniu administratorowi skutecznego zarządzania użytkownikami oraz procesami związanymi z realizacją projektów. Głównymi funkcjonalnościami aplikacji jest umożliwienie administratorowi tworzenia swoich użytkowników, tworzenie projektów. Administrator ma możliwość definiowania projektów oraz przypisywania do nich użytkowników. Ponadto, może również tworzyć zadania dla poszczególnych użytkowników w ramach konkretnych projektów.

Aplikacja systematycznie monitoruje postęp w realizacji projektów oraz ilość zadań pozostałych do wykonania, co umożliwia ścisłą kontrolę nad procesem. Kluczowym celem TaskFlow jest usprawnienie zarządzania projektami i zadaniami, co przekłada się na efektywność pracy zespołowej oraz terminowe osiąganie zamierzonych celów. Ponadto, aplikacja jest dostępna zarówno na urządzeniach mobilnych, jak i komputerach, co pozwala użytkownikom na elastyczne korzystanie z niej w różnych kontekstach i sytuacjach.

## **Prawa autorskie**

### a) Autorzy: 
- **Amelia Radziszewska**
- **Bianka Szejko**
- **Agata Ozorowska**

### b) Warunki licencyjne: 
Nasze oprogramowanie objęte jest licencją MIT. Wybrałyśmy ją ze względu na to, że jest ona bardzo prosta i przejrzysta, zarówno dla mnie jako twórcy, jak i dla użytkowników oprogramowania. Licencja MIT daje dużą swobodę – pozwala na używanie, kopiowanie, modyfikowanie i dystrybucję kodu, co może przyczynić się do jego większego rozpowszechnienia i ulepszenia przez społeczność. Jednocześnie zachowuje minimalne wymagania dotyczące dołączenia informacji o autorze i warunkach licencji, co zapewnia uznanie naszego wkładu. Dzięki licencji MIT możemy dzielić się swoim kodem, promować współpracę i rozwój, jednocześnie chroniąc swoje prawa autorskie.

## **Specyfikacja wymagań**

### Wymagania funkcjonalne

| ID  | USER STORY | OPIS ZADANIA | PRIORYTET |
|-----|------------|--------------|-----------|
| 1   | Jako admin/użytkownik, chcę mieć możliwość zalogowania się i wylogowania z aplikacji. | Użytkownik musi posiadać dostęp do formularzu logowania. Aplikacja musi sprawdzić poprawność danych logowania w bazie danych. Aplikacja musi wyświetlić komunikaty o niepowodzeniu lub powodzeniu akcji. | 1 |
| 2   | Jako admin/użytkownik, chcę mieć możliwość zmiany hasła do mojego konta. | Użytkownik musi mieć dostęp do formularza zmiany hasła w profilu użytkownika. Użytkownik musi podać swoje aktualne hasło, nowe hasło i potwierdzić je. | 1 |
| 3   | Jako admin chcę mieć możliwość rejestracji w aplikacji. | Administrator musi mieć dostęp do formularza rejestracji. Aplikacja musi walidować wprowadzone dane. | 1 |
| 4   | Jako admin chcę mieć możliwość wykonywania akcji CRUD nowego projektu i przypisania do niego użytkowników. | Administrator musi mieć dostęp do formularza dodawania projektu gdzie wypełni wszystkie potrzebne pola. Aplikacja musi dodać nowy projekt do bazy danych. Aplikacja musi wyświetlać odpowiednie komunikaty w zależności od powodzenia akcji. | 1 |
| 5   | Jako admin chcę mieć możliwość utworzenia wykonywania akcji CRUD dla nowego użytkownika. | Administrator musi mieć dostęp do formularza dodawania użytkownika. Administrator musi podać dane użytkownika (imię, nazwisko, adres e-mail, hasło, rola). Aplikacja musi dodać nowego użytkownika do bazy danych. | 1 |
| 6   | Jako admin chcę mieć możliwość wykonywania akcji CRUD dla nowych zadań (z nazwą, opisem i datą) danym użytkownikom. | Admin musi mieć dostęp do formularza dodawania zadania gdzie wypełni wszystkie potrzebne pola. Admin musi móc wybrać projekt, do którego należy zadanie. | 1 |
| 7   | Jako użytkownik chcę mieć możliwość monitorowania zadań z wszystkich projektów, do których przynależę. | Użytkownik musi mieć dostęp do panelu monitorowania zadań, który wyświetla wszystkie zadania użytkownika. Lista musi zawierać informacje o nazwie projektu, nazwie zadania, dacie realizacji, priorytecie i statusie zadania. Panel musi wyświetlać listę zadań przypisanych do użytkownika, których termin realizacji minął. | 1 |
| 8   | Jako użytkownik chcę mieć możliwość odznaczania wykonanych zadań. | Użytkownik musi mieć dostęp do listy zadań z możliwością odznaczenia checkboxa. | 1 |
| 9   | Jako użytkownik chcę mieć widok na dzisiejsze zadania. | Panel musi wyświetlać listę zadań przypisanych do użytkownika, których termin realizacji minął. Lista musi zawierać informacje o nazwie projektu, nazwie zadania, dacie realizacji, priorytecie i statusie zadania. | 2 |
| 10  | Jako użytkownik/admin chce otrzymywać powiadomienia, gdy termin realizacji zadania się zbliża. | Aplikacja musi posiadać funkcje natywne. Aplikacja w ustawieniach musi posiadać opcję włączenia bądź wyłączenia powiadomień. | 3 |

### Wymagania niefunkcjonalne

| ID  | USER STORY | OPIS ZADANIA | PRIORYTET |
|-----|------------|--------------|-----------|
| 1   | Jako admin chcę przejść do utworzenia nowego teamu w maksymalnie 5 kliknięciach | Administrator chce mieć możliwość szybkiego utworzenia nowego zespołu w aplikacji. | 2 |
| 2   | Jako użytkownik/admin chcę mieć możliwość znalezienia informacji o projekcie w maksymalnie 2 kliknięciach na stronie głównej aplikacji. | Użytkownik lub administrator oczekuje łatwego dostępu do istotnych informacji dotyczących projektów bez konieczności wielokrotnego przeszukiwania aplikacji. | 2 |
| 3   | Jako admin/Użytkownik chce aby widoki aplikacji były responsywne i dostosowywały się do różnych rozmiarów ekranów | Zarówno administrator, jak i użytkownik, oczekują, że aplikacja będzie responsywna i dostosowana do różnych urządzeń, takich jak komputery, tablety i smartfony. | 2 |



## **Architektura systemu/oprogramowania**

### a. Architektura rozwoju - stos technologiczny:
- **Backend:** Technologia .NET Framework lub .NET Core wykorzystywana do tworzenia backendowej logiki biznesowej i interakcji z bazą danych MongoDB.
- **Frontend:** Framework Ionic w połączeniu z językiem TypeScript i Angular dla budowy interfejsu użytkownika w aplikacji mobilnej.
- **Baza danych:** Baza danych MongoDB wykorzystywana do przechowywania danych aplikacji, zapewniająca skalowalność i elastyczność.
- **Edytor kodu:** Wykorzystanie Visual Studio Code jako środowiska programistycznego do pisania, debugowania i zarządzania kodem aplikacji.

### b. Architektura uruchomieniowa - stos technologiczny:

| Kategoria | Wymagania |
|-----------|-----------|
| **System operacyjny** | Windows, Linux, MacOS wraz z przeglądarką internetową |
| **.NET SDK** | Wersja: 5.0 lub nowsza |
| **Środowisko programistyczne backend** | Wersja: Visual Studio 2019 lub nowszy z wsparciem dla ASP.NET i Web Development, Alternatywa: Visual Studio Code (VS Code) z odpowiednimi rozszerzeniami |
| **Środowisko programistyczne frontend** | Ionic w wersji 7.2.0 z wykorzystaniem Angulara|
| **MongoDB** | MongoDB: Najnowsza wersja stabilna (np. MongoDB 4.4 lub 5.0), Zarządzanie bazą danych: MongoDB Compass lub Mongo Shell |
| **Kontrola wersji** | Narzędzie: Git, Repozytoria: GitHub |

## **Instalacja**

```sh
# Otwórz terminal lub wiersz poleceń
# Przejdź do katalogu, w którym chcesz sklonować repozytorium
cd /ścieżka/do/katalogu

# Skopiuj URL repozytorium z GitHub
# W terminalu wpisz komendę, aby sklonować repozytorium
git clone https://github.com/uzytkownik/nazwa-repozytorium.git

# Przejdź do katalogu projektu
cd nazwa-repozytorium

# Zainstaluj potrzebne zależności
npm install
npm install canvas-confetti
npm install swiper@8.4.7

```

## **Scenariusze testowe**

#### **1. Uwierzytelnianie użytkownika i administratora**

- #### Rejestracja użytkownika

  - **Warunki Wstępne:** brak
  - **Kroki:**
    - a. Otwarcie aplikacji 
    - b. Kliknięcie przycisku **"Register"**
    - c. Uzupełnienie poprawnie pól **"First Name"**, **"Last Name"**, **"Email"**, **"Password"**, **" Confirm password"**
    - d. Kliknięcie przycisku **"Register"**
  - **Oczekiwany Rezultat:** Użytkownik zarejestrował się pomyślnie i został przeniesiony do strony z logowaniem

- #### **Logowanie użytkownika**

  - **Warunki Wstępne:** Posiada konto użytkownika
  - **Kroki:**
    - a. Otwarcie aplikacji
    - b. Uzupełnienie pól **"Email address"** i **"Password"** poprawnymi danymi
    - c. Kliknięcie przycisku **"Login"**
  - **Oczekiwany Rezultat:** Użytkownik został zalogowany pomyślnie i został przeniesiony na stronę home

   #### **2. Zmiana hasła**

   - **Warunki Wstępne:** Posiada konto użytkownika
  - **Kroki:**
    - a. Otwarcie aplikacji
    - b. Przejście do strony "Settings"
    - c. Kliknięcie przycisku **"Change your password"**
    - d. Uzupełnienie pól **"Current Password"**, **"New Password"** oraz **"Confirm New Password"** danymi
    - e. Kliknięcie przycisku **"Change Password"**
  - **Oczekiwany Rezultat:** Hasło użytkownika zostało pomyślnie zaaktualizowane
 
  #### **3. Tworzenie projektu**

   - **Warunki Wstępne:** Posiada konto użytkownika z przypisaną rolą admin, stworzył minimum jednego użytkownika
  - **Kroki:**
    - a. Otwarcie aplikacji
    - b. Kliknięcie przycisku **"Add"**
    - c. Wybranie opcji **"Add new project"**
    - d. Uzupełnienie pól **"Name"**, **"Description"**, **"Date"** danymi
    - e. Wybranie z listy użytkowników minimum jednego użytkownika który ma być przypisany do projektu
  - **Oczekiwany Rezultat:** Projekt został pomyślnie utworzony a widok homepage zaaktualizowany
 
  #### **4. Tworzenie zadania**

   - **Warunki Wstępne:** Posiada konto użytkownika z przypisaną rolą admin, stworzył minimum jednego użytkownika który jest przypisany do projektu
  - **Kroki:**
    - a. Otwarcie aplikacji
    - b. Kliknięcie przycisku **"See details"** na swiperze
    - c. Wybranie z listy użytkownika 
    - d. Kliknięcie przycisku **"See profile"** 
    - e. Kliknięcie przycisku **"Add new task"**
    - f. Uzupełnienie pól **"Name"**, **"Description"**, **"Deadline"** danymi
    - e. Kliknięcie przycisku **"Add task"**
  - **Oczekiwany Rezultat:** Zadanie zostało przypisane do użytkownika a modal odświeżony
 
    
  #### **5. Monitorowanie zadań**

   - **Warunki Wstępne:** Posiada konto użytkownika, należy do minimum jednego projektu, jest do niego przypisane minimum jedno zadanie
  - **Kroki:**
    - a. Otwarcie aplikacji
    - b. Przejście na stronę "Home"
  - **Oczekiwany Rezultat:** Użytkownik widzi wszystkie zadania na dzisiaj

 
 #### **5. Odznaczanie zadań**
 
  - #### Użytkownik
     - **Warunki Wstępne:** Posiada konto użytkownika, należy do minimum jednego projektu, jest do niego przypisane minimum jedno zadanie
    - **Kroki:**
      - a. Otwarcie aplikacji
      - b. Przejście na stronę "Home"
      - c. Kliknięcie checkboxa przy wybranym zadaniu
    - **Oczekiwany Rezultat:** Status zadania w bazie danych zmienia się na "completed", a checkbox staje się zaznaczony

  - #### Admin
      - **Warunki Wstępne:** Posiada konto użytkownika z przypisaną rolą admin, stworzył minimum jeden projekt z minimum jednym użytkownikiem, do którego przypisane jest minimum jedno zadanie
    - **Kroki:**
      - a. Otwarcie aplikacji
      - b. Przejście na stronę "Home"
      - c. Kliknięcie przycisku **"See details"** na swiperze
      - d. Wybranie z listy użytkownika 
      - e. Kliknięcie przycisku **"See profile"**
      - f. Kliknięcie checkboxa przy wybranym zadaniu
    - **Oczekiwany Rezultat:** Status zadania w bazie danych zmienia się na "completed", a checkbox staje się zaznaczony
 
  #### **6. CRUD użytkownika**

  - #### Delete
  
    - **Warunki Wstępne:** Posiada konto użytkownika z przypisaną rolą admin, stworzył minimum jednego użytkownika
    - **Kroki:**
      - a. Otwarcie aplikacji
      - b. Przejście do strony "Settings"
      - c. Kliknięcie przycisku **"See all your users"**
      - d. Kliknięcie przycisku **"Delete"** przy wybranym użytkowniku
      - 
    - **Oczekiwany Rezultat:** Użytkownik został usunięty z bazy danych
 
   - #### Update
  
      - **Warunki Wstępne:** Posiada konto użytkownika z przypisaną rolą admin, stworzył minimum jednego użytkownika
      - **Kroki:**
        - a. Otwarcie aplikacji
        - b. Przejście do strony "Settings"
        - c. Kliknięcie przycisku **"See all your users"**
        - d. Kliknięcie przycisku **"Edit"** przy wybranym użytkowniku
        - e.Uzupełnienie pól **"First Name"**, **"Last Name"**, **"Email"** oraz **"Role"** danymi
        - c. Kliknięcie przycisku **"Save changes"**
      - **Oczekiwany Rezultat:** Dane użytkownika zostały zaaktualizowane w bazie danych 


  

