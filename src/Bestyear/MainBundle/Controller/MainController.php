<?php

namespace Bestyear\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response as Reponse;
use Symfony\Component\HttpFoundation\Request;

class MainController extends Controller
{
    function removeAccents($string) {
        $string = str_replace(
            array(
                'À', 'Â', 'Ä', 'á', 'Ã', 'Å',
                'Î', 'Ï', 'Ì', 'Í',
                'Ô', 'Ö', 'Ò', 'Ó', 'Õ', 'Ø',
                'Ù', 'Û', 'Ü', 'Ú',
                'É', 'È', 'Ê', 'Ë',
                'Ç', 'Ÿ', 'Ñ',
            ),
            array(
                'A', 'A', 'A', 'A', 'A', 'A',
                'I', 'I', 'I', 'I',
                'O', 'O', 'O', 'O', 'O', 'O',
                'U', 'U', 'U', 'U',
                'E', 'E', 'E', 'E',
                'C', 'Y', 'N',
            ),
            $string
        );
        return $string;
    }
    
    public function indexAction()
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            $now = date_create();
            $em = $this->getDoctrine()->getManager();
            
            // Users which birthday is today
            $query = $em->createQuery(
                "SELECT u 
                FROM BestyearUserBundle:User u 
                WHERE DATE_FORMAT(u.birthdate, '%m%d') = DATE_FORMAT(:now, '%m%d')"
            )->setParameter('now', $now);
            
            $birthdayUsers = $query->getResult();
            $birthdayData = array();
            $nowShort = date('md');
            $nowYear = date('Y');
            
            foreach ($birthdayUsers as $user) {
                $bdateShort = $user->getBirthdate()->format('md');
                $bdateYear = $user->getBirthdate()->format('Y');
                $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);
                if ($user->getGender() === "f") {
                    $gender = "female";
                } else {
                    $gender = "male";
                }
                $birthdayData[] = array(
                    "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                    "age" => $age,
                    "id" => $user->getId(),
                    "gender" => $gender,
                );
            }
            
            // Users which birthday is coming in 4 days
            $query = $em->createQuery(
                "SELECT u 
                FROM BestyearUserBundle:User u 
                WHERE DATE_FORMAT(u.birthdate, '%m%d') between DATE_FORMAT(DATE_ADD(:now, 1, 'day'), '%m%d') and date_format(DATE_ADD(:now, 4, 'day'), '%m%d')"
            )->setParameter('now', $now);
            
            $incomingBirthdayUsers = $query->getResult();
            $incomingBirthdayData = array();
            
            foreach ($incomingBirthdayUsers as $user) {
                $bdateShort = $user->getBirthdate()->format('md');
                $bdateYear = $user->getBirthdate()->format('Y');
                $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);
                if ($user->getGender() === "f") {
                    $gender = "female";
                } else {
                    $gender = "male";
                }
                $incomingBirthdayData[] = array(
                    "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                    "age" => $age,
                    "id" => $user->getId(),
                    "gender" => $gender,
                );
            }
            
            return $this->render('BestyearMainBundle:Main:indexLogged.html.twig', array('todaysBirthday' => $birthdayData, 'incomingBirthdayUsers' => $incomingBirthdayData));
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
    
    public function searchUsersAction(Request $request)
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            if ($request->query->get('callback') != null && $request->query->get('input') != null) {
                $em = $this->getDoctrine()->getManager();
                $users = $em->getRepository('BestyearUserBundle:User')->findBy(array(), array('familyname'=>'asc'));
                
                $search = $this->removeAccents(mb_strtoupper(htmlspecialchars($request->query->get('input')),'UTF-8'));
                $resultUsers = array();

                foreach ($users as $user) {
                    $comparison1 = substr($this->removeAccents(mb_strtoupper($user->getGivenname(),'UTF-8')), 0, strlen($search));
                    $comparison2 = substr($this->removeAccents(mb_strtoupper($user->getFamilyname(),'UTF-8')), 0, strlen($search));
                    $comparison3 = substr($this->removeAccents(mb_strtoupper($user->getUsername(),'UTF-8')), 0, strlen($search));
                    $comparison4 = substr($this->removeAccents(mb_strtoupper($user->getGivenname() . " " . $user->getFamilyname(),'UTF-8')), 0, strlen($search));
                    $comparison5 = substr($this->removeAccents(mb_strtoupper($user->getFamilyname() . " " . $user->getGivenname(),'UTF-8')), 0, strlen($search));
                    
                    if (levenshtein($search, $comparison1) <= floor(strlen($search)*35/100)) {
                        $resultUsers[] = $user;
                    } elseif (levenshtein($search, $comparison2) <= floor(strlen($search)*35/100)) {
                        $resultUsers[] = $user;
                    } elseif (levenshtein($search, $comparison3) <= floor(strlen($search)*35/100)) {
                        $resultUsers[] = $user;
                    } elseif (levenshtein($search, $comparison4) <= floor(strlen($search)*35/100)) {
                        $resultUsers[] = $user;
                    } elseif (levenshtein($search, $comparison5) <= floor(strlen($search)*35/100)) {
                        $resultUsers[] = $user;
                    }
                }
                
                $nowShort = date('md');
                $nowYear = date('Y');
                
                $response = new Reponse();
                $response->headers->set('Content-Type', 'text/javascript');
                
                $data = array();
                foreach ($resultUsers as $user) {
                    $bdateShort = $user->getBirthdate()->format('md');
                    $bdateYear = $user->getBirthdate()->format('Y');
                    $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);
                    if ($user->getGender() === "f") {
                        $gender = "female";
                    } else {
                        $gender = "male";
                    }
                    $data[] = array(
                        "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                        "login" => $user->getUsername(),
                        "studies" => $user->getTC() . $user->getStudylevel(),
                        "age" => $age,
                        "id" => $user->getId(),
                        "gender" => $gender,
                    );
                }
                
                $json = json_encode($data);
                $page = "var json = " . $json;
                $page .= "\n" . $request->query->get('callback') . '(json)';
                
                $response->setContent($page);
                
                return $response;
            } else {
                return $this->indexAction();
            }
        } else {
            return $this->indexAction();
        }
    }
    
    public function searchUserAction(Request $request, $id) {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            if ($id != null && $request->query->get('callback') != null) {
                $em = $this->getDoctrine()->getManager();
                $user = $em->getRepository('BestyearUserBundle:User')->findOneById($id);
                
                $nowShort = date('md');
                $nowYear = date('Y');
                
                $response = new Reponse();
                $response->headers->set('Content-Type', 'text/javascript');
                $bdateShort = $user->getBirthdate()->format('md');
                $bdateYear = $user->getBirthdate()->format('Y');
                $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);
                $address1_1 = null;
                $address1_2 = null;
                if ($user->getStreetNumber1()) {
                    $address1_1 = $user->getStreetNumber1() . " " . $user->getStreet1();
                    $address1_2 = $user->getPostcode1() . " " . $user->getCity1();
                }
                $address2_1 = null;
                $address2_2 = null;
                if ($user->getStreetNumber2()) {
                    $address2_1 = $user->getStreetNumber2() . " " . $user->getStreet2();
                    $address2_2 = $user->getPostcode2() . " " . $user->getCity2();
                }
                
                if ($user->getGender() === "f") {
                    $gender = "female";
                } else {
                    $gender = "male";
                }
                
                $data = array(
                    "id" => $user->getId(),
                    "gender" => $gender,
                    "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                    "login" => $user->getUsername(),
                    "studies" => $user->getTC() . $user->getStudylevel(),
                    "age" => $user->getBirthdate()->format('d/m/Y') . " (".$age." ans)",
                    "address1_1" => $address1_1,
                    "address1_2" => $address1_2,
                    "address2_1" => $address2_1,
                    "address2_2" => $address2_2,
                    "phone1" => $user->getPhone1(),
                    "phone2" => $user->getPhone2(),
                    "cellphone" => $user->getCellphone(),
                    "email" => $user->getEmail(),
                    "emailOptional" => $user->getEmailoptional(),
                    "facebook" => $user->getFacebook(),
                    "twitter" => $user->getTwitter(),
                    "tn05_job" => $user->getTn05Job(),
                    "tn05_place" => $user->getTn05Place(),
                    "tn07_job" => $user->getTn07Job(),
                    "tn07_place" => $user->getTn07Place(),
                    "tn09_job" => $user->getTn09Job(),
                    "tn09_place" => $user->getTn09Place(),
                    "tn010_job" => $user->getTn10Job(),
                    "tn10_place" => $user->getTn10Place(),
                );
                
                $json = json_encode($data);
                $page = "var json = " . $json;
                $page .= "\n" . $request->query->get('callback') . '(json)';
                
                $response->setContent($page);
                
                return $response;
            } else {
                return $this->indexAction();
            }
        } else {
            return $this->indexAction();
        }
    }
}
