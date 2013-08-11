<?php

namespace Bestyear\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response as Reponse;
use Symfony\Component\HttpFoundation\Request;

class MainController extends Controller
{
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
            
            // Users which birthday is coming in 4 days
            $query = $em->createQuery(
                "SELECT u 
                FROM BestyearUserBundle:User u 
                WHERE DATE_FORMAT(u.birthdate, '%m%d') between DATE_FORMAT(DATE_ADD(:now, 1, 'day'), '%m%d') and date_format(DATE_ADD(:now, 4, 'day'), '%m%d')"
            )->setParameter('now', $now);
            
            $incomingBirthdayUsers = $query->getResult();
            
            return $this->render('BestyearMainBundle:Main:indexLogged.html.twig', array('todaysBirthday' => $birthdayUsers, 'incomingBirthdayUsers' => $incomingBirthdayUsers));
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
    
    public function searchUsersAction(Request $request)
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            if ($request->query->get('callback') != null && $request->query->get('input') != null) {
                $em = $this->getDoctrine()->getManager();
                $users = $em->getRepository('BestyearUserBundle:User')->findAll();
                $data = array();
                
                $nowShort = date('md');
                $nowYear = date('Y');
                
                $response = new Reponse();
                $response->headers->set('Content-Type', 'text/javascript');
                
                foreach ($users as $user) {
                    $bdateShort = $user->getBirthdate()->format('md');
                    $bdateYear = $user->getBirthdate()->format('Y');
                    $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);
                    $data[] = array(
                     "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                     "studies" => $user->getTC() . $user->getStudylevel(),
                     "age" => $age,
                     "id" => $user->getId(),
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
                $address1 = null;
                if ($user->getStreetNumber1()) {
                    $address1 = $user->getStreetNumber1() . " " . $user->getStreet1() . "<br/>" . $user->getPostcode1() . " " . $user->getCity1();
                }
                $address2 = null;
                if ($user->getStreetNumber2()) {
                    $address2 = $user->getStreetNumber2() . " " . $user->getStreet2() . "<br/>" . $user->getPostcode2() . " " . $user->getCity2();
                }
                $data = array(
                 "id" => $user->getId(),
                 "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                 "studies" => $user->getTC() . $user->getStudylevel(),
                 "age" => $user->getBirthdate()->format('d/m/Y') . " (".$age." ans)",
                 "address1" => $address1,
                 "address2" => $address2,
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
